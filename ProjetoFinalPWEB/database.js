const fs = require('fs/promises');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// Ensure database file exists
async function initDB() {
    try {
        await fs.access(DB_FILE);
    } catch (err) {
        // File doesn't exist, create it with default data
        const initialData = {
            tasks: [
                {
                    id: '1',
                    titulo: 'Roteiro de Vídeo Tech',
                    descricao: 'Criar roteiro para o próximo vídeo sobre as novidades do JavaScript.',
                    categoria: 'Vídeo',
                    prioridade: 'Alta',
                    vencimento: '2026-06-10',
                    responsaveis: 'Miguel',
                    status: 'Ideias'
                },
                {
                    id: '2',
                    titulo: 'Post Instagram sobre UX',
                    descricao: 'Carrossel com dicas de usabilidade para formulários.',
                    categoria: 'Social',
                    prioridade: 'Média',
                    vencimento: '2026-06-15',
                    responsaveis: 'Ana',
                    status: 'Produção'
                }
            ],
            logs: []
        };
        await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    }
}

async function readDB() {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
}

async function writeDB(data) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { initDB, readDB, writeDB };
