import * as taskService from './services/taskService.js';

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'adicionar':
        try {
            const descricao = args[1];
            const tarefaAdcionada = await taskService.adicionarTarefa(descricao);
            console.log(`Tarefa #${tarefaAdcionada.id} adicionada`);
        } catch (error) {
            console.log(`Erro ao adicionar tarefa: ${error.message}`);
        }
        break;

    case 'listar':
        console.log('Comando listar acionado. (Aguardando implementação da lógica)');
        break;

    case 'concluir':
        console.log('Comando concluir acionado. (Aguardando implementação da lógica)');
        break;

    case 'remover':
        console.log('Comando remover acionado. (Aguardando implementação da lógica)');
        break;

    case 'ajuda':
    case undefined:
        console.log(`
            Comandos disponíveis:
            * adicionar <descrição>  - Adiciona uma nova tarefa
            * listar                 - Lista todas as tarefas
            * concluir <id>          - Marca uma tarefa como concluída
            * remover <id>           - Remove uma tarefa pelo ID
            * ajuda                  - Exibe esta mensagem de ajuda
        `);
        break;

    default:
        console.log(`Erro: Comando '${command}' inválido.`);
        console.log('Digite "ajuda" para ver os comandos disponíveis.');
        break;
}

