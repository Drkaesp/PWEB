// State Management
const defaultTasks = [
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
];

let tasks = JSON.parse(localStorage.getItem('kanban_tasks')) || defaultTasks;
let logs = JSON.parse(localStorage.getItem('kanban_logs')) || [];

function saveTasks() {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
}

function saveLogs() {
    localStorage.setItem('kanban_logs', JSON.stringify(logs));
}

function logActivity(message) {
    const now = new Date();
    const timeStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    
    logs.unshift({ time: timeStr, message });
    
    // Keep only the last 50 logs to save storage
    if(logs.length > 50) logs.pop();
    
    saveLogs();
    renderLogs();
}

// DOM Elements
const kanbanLists = document.querySelectorAll('.kanban-items');
const btnNovoItem = document.getElementById('btnNovoItem');
const modal = document.getElementById('crudModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');
const btnSave = document.getElementById('btnSave');
const itemForm = document.getElementById('itemForm');
const searchInput = document.getElementById('searchInput');
const btnThemeToggle = document.getElementById('btnThemeToggle');
const toastContainer = document.getElementById('toast-container');
const btnHistory = document.getElementById('btnHistory');
const historySidebarOverlay = document.getElementById('historySidebarOverlay');
const btnCloseHistory = document.getElementById('btnCloseHistory');
const historyLogsContainer = document.getElementById('historyLogsContainer');

// Form Fields
const fId = document.getElementById('itemId');
const fTitulo = document.getElementById('titulo');
const fDescricao = document.getElementById('descricao');
const fCategoria = document.getElementById('categoria');
const fPrioridade = document.getElementById('prioridade');
const fVencimento = document.getElementById('vencimento');
const fResponsaveis = document.getElementById('responsaveis');
const fStatus = document.getElementById('status');
const modalTitle = document.getElementById('modalTitle');

// Initialize
function init() {
    loadTheme();
    renderTasks();
    renderLogs();
    setupEventListeners();
    setupDragAndDrop();
}

// Render Tasks
function renderTasks() {
    // Clear lists
    kanbanLists.forEach(list => list.innerHTML = '');
    
    const searchTerm = searchInput.value.toLowerCase();

    // Filter and distribute tasks
    const filteredTasks = tasks.filter(task => 
        task.titulo.toLowerCase().includes(searchTerm) || 
        task.descricao.toLowerCase().includes(searchTerm)
    );

    filteredTasks.forEach(task => {
        const normalizedStatus = task.status.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const list = document.getElementById(`list-${normalizedStatus}`);
        if (list) {
            list.appendChild(createTaskCard(task));
        }
    });

    // Check for empty states
    kanbanLists.forEach(list => {
        if (list.children.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-inbox"></i>
                    <p>Nenhuma tarefa aqui</p>
                </div>
            `;
        }
    });

    // Update counts
    updateCounts();
}

// Create Task Card DOM Element
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.dataset.id = task.id;

    const prioridadeClass = task.prioridade.toLowerCase().replace('é', 'e');
    const dot = task.prioridade === 'Alta' ? '🔴' : task.prioridade === 'Média' ? '🟡' : '🟢';

    // Format date
    let dateStr = '';
    if(task.vencimento) {
        const [y,m,d] = task.vencimento.split('-');
        dateStr = `${d}/${m}`;
    }

    card.innerHTML = `
        <div class="task-header">
            <h3 class="task-title">${task.titulo}</h3>
            <div class="task-actions">
                <button onclick="editTask('${task.id}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteTask('${task.id}')" class="btn-delete" title="Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        ${task.categoria ? `<span class="badge-category">${task.categoria}</span>` : ''}
        <p class="task-desc">${task.descricao}</p>
        <div class="task-footer">
            <span class="badge-priority ${prioridadeClass}">${dot} ${task.prioridade}</span>
            <div class="task-meta">
                <span title="Vencimento"><i class="fa-regular fa-calendar"></i> ${dateStr}</span>
                <span title="Responsáveis"><i class="fa-regular fa-user"></i> ${task.responsaveis}</span>
            </div>
        </div>
    `;

    // Drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    return card;
}

// Update Column Counts
function updateCounts() {
    ['Ideias', 'Produção', 'Publicados'].forEach(status => {
        const count = tasks.filter(t => t.status === status).length;
        const normalizedStatus = status.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const col = document.getElementById(`col-${normalizedStatus}`);
        if(col) {
            col.querySelector('.item-count').textContent = count;
        }
    });
}

// Search
searchInput.addEventListener('input', renderTasks);

// Modal Logic
function openModal(editId = null) {
    if (editId) {
        modalTitle.textContent = 'Editar Item de Conteúdo';
        const task = tasks.find(t => t.id === editId);
        fId.value = task.id;
        fTitulo.value = task.titulo;
        fDescricao.value = task.descricao;
        if(fCategoria) fCategoria.value = task.categoria || 'Outros';
        fPrioridade.value = task.prioridade;
        fVencimento.value = task.vencimento;
        fResponsaveis.value = task.responsaveis;
        fStatus.value = task.status;
    } else {
        modalTitle.textContent = 'Criar Item de Conteúdo';
        itemForm.reset();
        fId.value = '';
    }
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// Form Submit
btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    if(!itemForm.checkValidity()) {
        itemForm.reportValidity();
        return;
    }

    const taskData = {
        id: fId.value || Date.now().toString(),
        titulo: fTitulo.value,
        descricao: fDescricao.value,
        categoria: fCategoria ? fCategoria.value : 'Outros',
        prioridade: fPrioridade.value,
        vencimento: fVencimento.value,
        responsaveis: fResponsaveis.value,
        status: fStatus.value
    };

    if (fId.value) {
        // Edit
        const index = tasks.findIndex(t => t.id === fId.value);
        tasks[index] = taskData;
        showToast('Item atualizado com sucesso!', 'success');
        logActivity(`A tarefa <b>${taskData.titulo}</b> foi atualizada.`);
    } else {
        // Create
        tasks.push(taskData);
        showToast('Novo item criado!', 'success');
        logActivity(`Uma nova tarefa <b>${taskData.titulo}</b> foi criada em <b>${taskData.status}</b>.`);
    }

    saveTasks();
    renderTasks();
    closeModal();
});

// Delete Task (called globally from inline onclick)
window.deleteTask = function(id) {
    if(confirm('Tem certeza que deseja excluir este item?')) {
        const taskToDelete = tasks.find(t => t.id === id);
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        showToast('Item excluído.', 'info');
        if(taskToDelete) {
            logActivity(`A tarefa <b>${taskToDelete.titulo}</b> foi excluída.`);
        }
    }
}

// Edit Task (called globally from inline onclick)
window.editTask = function(id) {
    openModal(id);
}

// Event Listeners
function setupEventListeners() {
    btnNovoItem.addEventListener('click', () => openModal());
    btnCloseModal.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    // Theme Toggle
    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', toggleTheme);
    }

    // History Sidebar
    if (btnHistory) {
        btnHistory.addEventListener('click', () => historySidebarOverlay.classList.add('active'));
    }
    if (btnCloseHistory) {
        btnCloseHistory.addEventListener('click', () => historySidebarOverlay.classList.remove('active'));
    }
    
    // Close on overlay click
    historySidebarOverlay.addEventListener('click', (e) => {
        if(e.target === historySidebarOverlay) historySidebarOverlay.classList.remove('active');
    });

    // Close on modal overlay click
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
}

// Drag and Drop Logic
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItem = null;
    kanbanLists.forEach(list => list.classList.remove('drag-over'));
}

function setupDragAndDrop() {
    kanbanLists.forEach(list => {
        list.addEventListener('dragover', e => {
            e.preventDefault();
            list.classList.add('drag-over');
        });

        list.addEventListener('dragleave', () => {
            list.classList.remove('drag-over');
        });

        list.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (draggedItem) {
                const taskId = draggedItem.dataset.id;
                const newStatus = this.dataset.status;
                
                // Update state
                const task = tasks.find(t => t.id === taskId);
                if(task && task.status !== newStatus) {
                    const oldStatus = task.status;
                    task.status = newStatus;
                    saveTasks();
                    renderTasks();
                    logActivity(`A tarefa <b>${task.titulo}</b> foi movida para <b>${newStatus}</b>.`);
                }
            }
        });
    });
}

// Theme Logic
function loadTheme() {
    const isDark = localStorage.getItem('kanban_theme') === 'dark';
    if (isDark) {
        document.documentElement.classList.add('dark');
        updateThemeIcon(true);
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('kanban_theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    if(!btnThemeToggle) return;
    btnThemeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// Toast Logic
function showToast(message, type = 'success') {
    if(!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render Logs
function renderLogs() {
    if(!historyLogsContainer) return;
    
    historyLogsContainer.innerHTML = '';
    
    if(logs.length === 0) {
        historyLogsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clock"></i>
                <p>Nenhum histórico disponível</p>
            </div>
        `;
        return;
    }
    
    logs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'log-item';
        item.innerHTML = `
            <span class="log-time">${log.time}</span>
            <p class="log-message">${log.message}</p>
        `;
        historyLogsContainer.appendChild(item);
    });
}

// Run app
init();
