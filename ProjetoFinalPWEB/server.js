const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize DB on startup
db.initDB().then(() => {
    console.log('Database initialized.');
}).catch(err => {
    console.error('Failed to initialize database:', err);
});

// --- API Endpoints ---

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const data = await db.readDB();
        res.json(data.tasks);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = req.body;
        // Validation
        if (!task.titulo || !task.descricao || !task.status) {
            return res.status(400).json({ error: 'Título, descrição e status são obrigatórios' });
        }
        
        // Generate a unique ID for the new task
        task.id = Date.now().toString();
        
        const data = await db.readDB();
        data.tasks.push(task);
        await db.writeDB(data);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTask = req.body;
        
        if (!updatedTask.titulo || !updatedTask.descricao || !updatedTask.status) {
            return res.status(400).json({ error: 'Título, descrição e status são obrigatórios' });
        }

        const data = await db.readDB();
        const index = data.tasks.findIndex(t => t.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        
        data.tasks[index] = { ...data.tasks[index], ...updatedTask, id }; // Ensure ID doesn't change
        await db.writeDB(data);
        res.json(data.tasks[index]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await db.readDB();
        const initialLength = data.tasks.length;
        
        data.tasks = data.tasks.filter(t => t.id !== id);
        
        if (data.tasks.length === initialLength) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        
        await db.writeDB(data);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

// Get logs
app.get('/api/logs', async (req, res) => {
    try {
        const data = await db.readDB();
        res.json(data.logs);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar histórico' });
    }
});

// Add a log
app.post('/api/logs', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }
        
        const data = await db.readDB();
        
        const now = new Date();
        const timeStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
        
        data.logs.unshift({ time: timeStr, message });
        
        // Keep only last 50
        if (data.logs.length > 50) {
            data.logs.pop();
        }
        
        await db.writeDB(data);
        res.status(201).json(data.logs[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar no histórico' });
    }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
