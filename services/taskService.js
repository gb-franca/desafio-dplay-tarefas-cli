import { lerTarefas, salvarTarefas } from '../repository/taskRepository.js';

export async function adicionarTarefa(descricao) {

    if (!descricao || descricao.trim() === '') {
        throw new Error('A descrição da tarefa não pode ser vazia.');
    }

    const tasks = await lerTarefas();
    let maiorId = 0;

    if (tasks.length > 0) {
        maiorId = Math.max(...tasks.map(t => t.id));
    } else {
        maiorId = 0;
    }

    const newId = maiorId + 1;
    const newTask = {
        id: newId,
        descricao: descricao,
        status: 'pendente',
        dateCreate: new Date().toISOString()
    };

    tasks.push(newTask);
    await salvarTarefas(tasks);

    return newTask;

}
