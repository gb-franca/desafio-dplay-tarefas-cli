import fs from 'node:fs/promises';

const CAMINHO_ARQUIVO = 'tasks.json';

export async function lerTarefas() {
    try {
        const data = await fs.readFile(CAMINHO_ARQUIVO, 'utf-8');
        let tasks = JSON.parse(data);

        return tasks;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }

}

export async function salvarTarefas(tasks) {
    const dadosEmTexto = JSON.stringify(tasks, null, 2);
    await fs.writeFile(CAMINHO_ARQUIVO, dadosEmTexto, 'utf-8');
}
