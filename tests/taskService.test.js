import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {
    adicionarTarefa,
    listarTarefas,
    concluirTarefa,
    removerTarefa,
    editarTarefa
} from '../services/taskService.js';

const CAMINHO_ARQUIVO = 'tasks.json';

describe('TaskService - Testes Unitários', () => {
    let backupOriginal = null;

    before(async () => {
        try {
            backupOriginal = await fs.readFile(CAMINHO_ARQUIVO, 'utf-8');
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            backupOriginal = null;
        }
    });

    after(async () => {
        if (backupOriginal !== null) {
            await fs.writeFile(CAMINHO_ARQUIVO, backupOriginal, 'utf-8');
        } else {
            try {
                await fs.unlink(CAMINHO_ARQUIVO);
            } catch (error) {
                if (error.code !== 'ENOENT') throw error;
            }
        }
    });

    beforeEach(async () => {
        await fs.writeFile(CAMINHO_ARQUIVO, '[]', 'utf-8');
    });

    describe('adicionarTarefa', () => {
        it('deve adicionar uma nova tarefa com id incremental e status pendente', async () => {
            const tarefa1 = await adicionarTarefa('Estudar Node.js');
            assert.equal(tarefa1.id, 1);
            assert.equal(tarefa1.descricao, 'Estudar Node.js');
            assert.equal(tarefa1.status, 'pendente');
            assert.ok(tarefa1.dateCreate);

            const tarefa2 = await adicionarTarefa('Estudar Git');
            assert.equal(tarefa2.id, 2);
            assert.equal(tarefa2.descricao, 'Estudar Git');
        });

        it('deve lançar erro ao tentar adicionar tarefa com descrição vazia ou só com espaços', async () => {
            await assert.rejects(
                () => adicionarTarefa(''),
                /A descrição da tarefa não pode ser vazia/
            );

            await assert.rejects(
                () => adicionarTarefa('   '),
                /A descrição da tarefa não pode ser vazia/
            );
        });
    });

    describe('listarTarefas', () => {
        it('deve listar todas as tarefas quando nenhum filtro for informado', async () => {
            await adicionarTarefa('Tarefa 1');
            await adicionarTarefa('Tarefa 2');

            const tarefas = await listarTarefas();
            assert.equal(tarefas.length, 2);
        });

        it('deve filtrar corretamente por tarefas pendentes e concluídas', async () => {
            const t1 = await adicionarTarefa('Tarefa Pendente');
            const t2 = await adicionarTarefa('Tarefa Concluída');
            await concluirTarefa(t2.id);

            const pendentes = await listarTarefas('pendente');
            assert.equal(pendentes.length, 1);
            assert.equal(pendentes[0].id, t1.id);

            const concluidas = await listarTarefas('concluida');
            assert.equal(concluidas.length, 1);
            assert.equal(concluidas[0].id, t2.id);
        });

        it('deve lançar erro se o filtro for inválido', async () => {
            await assert.rejects(
                () => listarTarefas('status-inexistente'),
                /Filtro "status-inexistente" inválido/
            );
        });
    });

    describe('concluirTarefa', () => {
        it('deve marcar uma tarefa como concluída com sucesso', async () => {
            const tarefa = await adicionarTarefa('Aprender Testes');
            const concluida = await concluirTarefa(tarefa.id);

            assert.equal(concluida.id, tarefa.id);
            assert.equal(concluida.status, 'concluida');

            const tarefas = await listarTarefas();
            assert.equal(tarefas[0].status, 'concluida');
        });

        it('deve lançar erro quando o ID não for informado ou for inválido', async () => {
            await assert.rejects(
                () => concluirTarefa(),
                /O ID da tarefa deve ser informado/
            );

            await assert.rejects(
                () => concluirTarefa('abc'),
                /O ID da tarefa deve ser um número inteiro válido/
            );
        });

        it('deve lançar erro quando o ID da tarefa não existir', async () => {
            await assert.rejects(
                () => concluirTarefa(999),
                /Tarefa com ID #999 não encontrada/
            );
        });
    });

    describe('removerTarefa', () => {
        it('deve remover a tarefa pelo ID com sucesso', async () => {
            const t1 = await adicionarTarefa('Tarefa 1');
            const t2 = await adicionarTarefa('Tarefa 2');

            const removida = await removerTarefa(t1.id);
            assert.equal(removida.id, t1.id);

            const restantes = await listarTarefas();
            assert.equal(restantes.length, 1);
            assert.equal(restantes[0].id, t2.id);
        });

        it('deve lançar erro se o ID for inválido ou não existir', async () => {
            await assert.rejects(
                () => removerTarefa(),
                /O ID da tarefa deve ser informado/
            );

            await assert.rejects(
                () => removerTarefa(999),
                /Tarefa com ID #999 não encontrada/
            );
        });
    });

    describe('editarTarefa', () => {
        it('deve editar a descrição de uma tarefa existente', async () => {
            const tarefa = await adicionarTarefa('Descrição antiga');
            const editada = await editarTarefa(tarefa.id, 'Descrição nova e atualizada');

            assert.equal(editada.id, tarefa.id);
            assert.equal(editada.descricao, 'Descrição nova e atualizada');

            const tarefas = await listarTarefas();
            assert.equal(tarefas[0].descricao, 'Descrição nova e atualizada');
        });

        it('deve lançar erro ao tentar editar com descrição vazia', async () => {
            const tarefa = await adicionarTarefa('Tarefa original');
            await assert.rejects(
                () => editarTarefa(tarefa.id, '   '),
                /A nova descrição da tarefa não pode ser vazia/
            );
        });

        it('deve lançar erro se o ID não existir', async () => {
            await assert.rejects(
                () => editarTarefa(999, 'Nova descrição'),
                /Tarefa com ID #999 não encontrada/
            );
        });
    });
});
