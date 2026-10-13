# Gerenciador de Tarefas CLI (dplay-tarefas-cli)

Aplicação de linha de comando (CLI) desenvolvida em Node.js para gerenciamento prático e persistente de tarefas no terminal. Desenvolvida como parte do processo seletivo da **Dplay Solutions**.

---

## Sobre o projeto

O **dplay-tarefas-cli** permite criar, visualizar, atualizar o status, editar e remover tarefas diretamente pelo terminal. Todas as tarefas são persistidas em um arquivo local em formato JSON (`tasks.json`), garantindo que seus dados permaneçam salvos mesmo após o encerramento do programa ou reinicialização do sistema.

A aplicação conta com validação de dados de entrada, mensagens de erro descritivas, exibição amigável com status visual (`[ ]` para pendentes e `[x]` para concluídas), filtro por status e comandos intuitivos.

---

## Tecnologias

- **Linguagem:** JavaScript (Node.js)
- **Versão do Node.js recomendada:** Node.js v18.0.0 ou superior (suporte nativo a ES Modules e ao test runner `node:test`)
- **Bibliotecas e Dependências:** Apenas módulos nativos da plataforma Node.js:
  - `node:fs/promises` para operações assíncronas de leitura e escrita de arquivos
  - `node:test` e `node:assert/strict` para execução da suíte de testes automatizados

> Não há dependências externas de terceiros, garantindo instalação instantânea, segurança e inicialização imediata.

---

## Como instalar

### Pré-requisitos
- [Git](https://git-scm.com/) instalado no sistema.
- [Node.js](https://nodejs.org/) (versão 18 ou superior).

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gb-franca/desafio-dplay-tarefas-cli.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd dplay-tarefas-cli
   ```

3. **Execução:**
   Como o projeto utiliza apenas recursos nativos do Node.js, não é obrigatório rodar `npm install` para dependências de terceiros. Você pode executar a CLI de duas maneiras:

   - **Forma 1 (Padrão com Node):**
     ```bash
     node index.js ajuda
     ```

   - **Forma 2 (Comando global via `npm link` - Diferencial):**
     Execute o comando de link na raiz do projeto:
     ```bash
     npm link
     ```
     Agora o comando `tarefas` estará disponível globalmente no seu terminal:
     ```bash
     tarefas ajuda
     ```

---

## Como usar

Abaixo estão todos os comandos disponíveis com exemplos reais de entrada e saída esperada:

### 1. Ajuda
Exibe a lista de comandos e a sintaxe de cada um.
- **Entrada:**
  ```bash
  node index.js ajuda
  ```
- **Saída:**
  ```text
  Comandos disponíveis:
    * adicionar <descrição>            - Adiciona uma nova tarefa
    * listar [pendente|concluida]      - Lista todas as tarefas ou filtra por status
    * concluir <id>                    - Marca uma tarefa como concluída
    * remover <id>                     - Remove uma tarefa pelo ID
    * editar <id> "<nova descrição>"   - Edita a descrição de uma tarefa
    * ajuda                            - Exibe esta mensagem de ajuda
  ```

---

### 2. Adicionar uma tarefa
Cria uma nova tarefa com status inicial `pendente` e data de criação atual.
- **Entrada:**
  ```bash
  node index.js adicionar "Estudar Git"
  ```
- **Saída:**
  ```text
  Tarefa #1 adicionada
  ```

---

### 3. Listar tarefas
Lista todas as tarefas cadastradas, indicando status (`[ ]` pendente, `[x]` concluída), identificador (`#id`), descrição e data de criação formatada (`DD/MM/AAAA`).
- **Entrada:**
  ```bash
  node index.js listar
  ```
- **Saída:**
  ```text
  [ ] #1 Estudar Git 13/10/2026
  ```

#### Diferencial: Filtrar listagem por status
Você pode filtrar apenas as tarefas pendentes ou concluídas:
- **Listar pendentes:**
  ```bash
  node index.js listar pendente
  ```
  *Saída:*
  ```text
  [ ] #1 Estudar Git 13/10/2026
  ```

- **Listar concluídas:**
  ```bash
  node index.js listar concluida
  ```
  *Saída (caso não haja nenhuma):*
  ```text
  Nenhuma tarefa com status "concluida" encontrada.
  ```

---

### 4. Concluir uma tarefa
Atualiza o status da tarefa para `concluida` pelo seu ID numérico.
- **Entrada:**
  ```bash
  node index.js concluir 1
  ```
- **Saída:**
  ```text
  Tarefa #1 concluída.
  ```

Ao listar novamente:
- **Entrada:**
  ```bash
  node index.js listar
  ```
- **Saída:**
  ```text
  [x] #1 Estudar Git 13/10/2026
  ```

---

### 5. Editar a descrição de uma tarefa (Diferencial)
Permite alterar a descrição de uma tarefa existente sem modificar seu ID, status ou data.
- **Entrada:**
  ```bash
  node index.js editar 1 "Estudar Git e GitHub Avançado"
  ```
- **Saída:**
  ```text
  Tarefa #1 atualizada.
  ```

---

### 6. Remover uma tarefa
Remove permanentemente uma tarefa pelo ID.
- **Entrada:**
  ```bash
  node index.js remover 1
  ```
- **Saída:**
  ```text
  Tarefa #1 removida.
  ```

Ao listar quando não houver tarefas:
- **Entrada:**
  ```bash
  node index.js listar
  ```
- **Saída:**
  ```text
  Nenhuma tarefa cadastrada.
  ```

---

### 7. Tratamento de erros e comandos inválidos
A aplicação conta com validações defensivas e fornece retorno claro para parâmetros ausentes ou incorretos:

- **Comando desconhecido:**
  ```bash
  node index.js desconhecido
  ```
  *Saída:*
  ```text
  Erro: Comando 'desconhecido' inválido.
  Digite "ajuda" para ver os comandos disponíveis.
  ```

- **Descrição vazia ao adicionar:**
  ```bash
  node index.js adicionar ""
  ```
  *Saída:*
  ```text
  Erro ao adicionar tarefa: A descrição da tarefa não pode ser vazia.
  ```

- **ID inexistente ao concluir ou remover:**
  ```bash
  node index.js concluir 99
  ```
  *Saída:*
  ```text
  Erro ao concluir tarefa: Tarefa com ID #99 não encontrada.
  ```

- **ID não numérico:**
  ```bash
  node index.js remover abc
  ```
  *Saída:*
  ```text
  Erro ao remover tarefa: O ID da tarefa deve ser um número inteiro válido.
  ```

---

## Testes Automatizados (Diferencial)

O projeto conta com uma suíte completa de **testes unitários automatizados** cobrindo todas as regras de negócio e validações da camada de serviços (13 cenários de teste cobrindo fluxos de sucesso e exceções).

Para executar os testes:
```bash
npm test
```

Os testes utilizam o test runner oficial do Node.js (`node:test`) e executam de forma totalmente isolada, sem alterar o arquivo de dados original do usuário.

---

## Como foi o desenvolvimento

### Organização do código e Arquitetura em Camadas
Para manter o código limpo, testável e manutenível, o projeto foi estruturado seguindo o padrão de **Separação de Responsabilidades (SoC)** dividido em 3 camadas:

1. **Camada de Entrada / Interface (`index.js`):**
   - Responsável por capturar os argumentos do terminal (`process.argv`), despachar para o comando correto, formatar a saída para o usuário (`formatarData`, ícones de status `[ ]` e `[x]`) e capturar exceções com mensagens claras e amigáveis.
2. **Camada de Regras de Negócio (`services/taskService.js`):**
   - Contém a lógica central da aplicação: cálculo de auto-incremento de IDs, validações de parâmetros (descrições vazias, tipos de dados dos IDs), filtros e operações sobre a lista de tarefas.
3. **Camada de Armazenamento / Repositório (`repository/taskRepository.js`):**
   - Responsável exclusivamente pelo I/O do arquivo local `tasks.json` utilizando a API `node:fs/promises`, tratando casos como ausência inicial do arquivo (`ENOENT`) retornando um array vazio.

### Decisões tomadas
- **Utilização de ES Modules (`"type": "module"`):** Adoção dos padrões mais modernos do ecossistema JavaScript (`import`/`export` e `top-level await`).
- **Zero Dependências Externas (`Zero-dependency`):** Toda a CLI e os testes foram implementados utilizando ferramentas nativas do Node.js, mantendo o repositório leve, rápido de clonar e sem vulnerabilidades de pacotes externos.
- **Suporte a Executável Global:** Inclusão de hashbang `#!/usr/bin/env node` e mapeamento no campo `"bin"` do `package.json` para suportar tanto execução direta via script quanto instalação global com `npm link`.
- **Git e Commits Semânticos:** O histórico de commits foi estruturado de forma granular e progressiva a cada funcionalidade e diferencial entregue, utilizando a convenção *Conventional Commits* (`feat:`, `test:`, `docs:`, `chore:`).

### Dificuldades e como foram resolvidas
- **Persistência e consistência de IDs ao excluir tarefas:** Ao excluir tarefas do meio da lista, não poderíamos simplesmente utilizar o `tasks.length + 1` para o próximo ID, pois geraria IDs duplicados. A solução foi calcular o maior ID existente (`Math.max(...tasks.map(t => t.id)) + 1`), garantindo integridade mesmo após exclusões.
- **Isolamento dos testes unitários:** Como o serviço interage com o sistema de arquivos, os testes poderiam sobrescrever as tarefas reais do usuário. Isso foi resolvido criando hooks `before` e `after` no arquivo de teste para fazer backup do arquivo `tasks.json` antes da suíte e restaurá-lo fielmente ao final.

---

## Próximos passos

Com mais tempo para evolução do projeto, as seguintes melhorias poderiam ser implementadas:
1. **Prioridades e Categorias:** Adicionar níveis de prioridade (baixa, média, alta) e etiquetas/tags para organizar tarefas por projetos.
2. **Datas de Vencimento e Notificações:** Adicionar suporte a prazos de entrega (`deadline`) e aviso no terminal sobre tarefas atrasadas.
3. **Exportação de Relatórios:** Suporte a exportação da lista de tarefas para outros formatos, como CSV e Markdown.
4. **Interface Interativa (TUI):** Implementar um modo interativo no terminal utilizando setas do teclado e caixas de seleção.
