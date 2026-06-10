# ContentFlow - Kanban Board

Um Kanban board simples construído com Node.js (Express) e persistência em arquivo JSON.

## Funcionalidades
- Persistência em banco de dados local (`database.json`)
- Operações CRUD completas para tarefas
- Histórico de Atividades
- Usabilidade com estados de loading e Optimistic UI

## Como Executar

### 1. Instalar Dependências
Para que o servidor funcione, é necessário instalar as dependências (como o `express`). Para isso, certifique-se de que o **Node.js** e o **npm** estão corretamente instalados.
Abra o terminal na pasta do projeto e execute:
```bash
npm install
```

*(Se você encontrou o erro "O termo 'npm' não é reconhecido", seu Node.js pode não estar configurado corretamente nas variáveis de ambiente do Windows, ou você precisa abrir o terminal do próprio Node.js).*

### 2. Iniciar o Servidor
Após instalar as dependências, inicie o servidor com o comando:
```bash
node server.js
```
*(Você verá a mensagem: "Servidor rodando em http://localhost:3000")*

### 3. Acessar a Aplicação
Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)
