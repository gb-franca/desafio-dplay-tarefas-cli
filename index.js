import * as taskService from './services/taskService.js';

const args = process.argv.slice(2);
const command = args[0];

function formatarData(dataIso) {
    if (!dataIso) return '';
    const data = new Date(dataIso);
    if (isNaN(data.getTime())) return '';
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

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
        try {
            const filtro = args[1];
            const tarefas = await taskService.listarTarefas(filtro);

            if (tarefas.length === 0) {
                console.log(filtro ? `Nenhuma tarefa com status "${filtro}" encontrada.` : 'Nenhuma tarefa cadastrada.');
                break;
            }

            tarefas.forEach(t => {
                const check = t.status === 'concluida' ? '[x]' : '[ ]';
                const dataFormatada = formatarData(t.dateCreate);
                console.log(`${check} #${t.id} ${t.descricao} ${dataFormatada}`);
            });
        } catch (error) {
            console.log(`Erro ao listar tarefas: ${error.message}`);
        }
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
  * adicionar <descrição>       - Adiciona uma nova tarefa
  * listar [pendente|concluida] - Lista todas as tarefas ou filtra por status
  * concluir <id>               - Marca uma tarefa como concluída
  * remover <id>                - Remove uma tarefa pelo ID
  * ajuda                       - Exibe esta mensagem de ajuda
        `.trim());
        break;

    default:
        console.log(`Erro: Comando '${command}' inválido.`);
        console.log('Digite "ajuda" para ver os comandos disponíveis.');
        break;
}

