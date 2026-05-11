// URLs das imagens
const imagens = {
    fechada: 'https://media.istockphoto.com/id/524622159/pt/foto/janela-fechada.jpg?s=170667a&w=0&k=20&c=4v7rKF9OP4PeiT-C8bA1I2MMwVnLvXbamNnZRzVI9Pg=',
    aberta: 'https://tse1.mm.bing.net/th/id/OIP.XoDECLxigXMXLqKf95s5XQHaFj?pid=ImgDet&w=178&h=133&c=7&dpr=1,5&o=7&rm=3',
    quebrada: 'https://tse4.mm.bing.net/th/id/OIP.XWMKjB6B9QlzXEQk3VXJNQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3'
};

// Estado atual da janela
let estadoAtual = 'fechada';
let estaQuebrada = false;

// Elementos do DOM
const windowImage = document.getElementById('windowImage');
const titulo = document.getElementById('titulo');
const windowContainer = document.querySelector('.window-container');

// Função para atualizar a imagem e o título
function atualizarJanela(novoEstado) {
    estadoAtual = novoEstado;
    
    // Atualiza a imagem
    windowImage.src = imagens[novoEstado];
    
    // Atualiza o título
    switch(novoEstado) {
        case 'fechada':
            titulo.textContent = 'Janela Fechada';
            titulo.className = 'fechada';
            windowContainer.classList.remove('quebrada', 'broken-effect');
            break;
        case 'aberta':
            titulo.textContent = 'Janela Aberta';
            titulo.className = 'aberta';
            windowContainer.classList.remove('quebrada', 'broken-effect');
            break;
        case 'quebrada':
            titulo.textContent = 'Janela Quebrada';
            titulo.className = 'quebrada';
            windowContainer.classList.add('quebrada', 'broken-effect');
            break;
    }
}

// Evento: mouse entra na imagem (abre a janela)
windowImage.addEventListener('mouseenter', function() {
    if (!estaQuebrada) {
        atualizarJanela('aberta');
    }
});

// Evento: mouse sai da imagem (fecha a janela)
windowImage.addEventListener('mouseleave', function() {
    if (!estaQuebrada) {
        atualizarJanela('fechada');
    }
});

// Evento: clique na imagem (quebra a janela)
windowImage.addEventListener('click', function() {
    if (!estaQuebrada) {
        estaQuebrada = true;
        atualizarJanela('quebrada');
        
        // Opcional: mostrar mensagem após quebrar
        setTimeout(() => {
            alert('Ops! A janela quebrou! 😱');
        }, 300);
    }
});

// Inicializa com a janela fechada
atualizarJanela('fechada');