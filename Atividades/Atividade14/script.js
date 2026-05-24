// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Obtém referências aos elementos do DOM
    const inputTexto = document.getElementById('inputTexto');
    const radioMaiuscula = document.getElementById('radioMaiuscula');
    const radioMinuscula = document.getElementById('radioMinuscula');
    const resultado = document.getElementById('resultado');
    
    // Função para atualizar o texto conforme o radio button selecionado
    function atualizarTexto() {
        const texto = inputTexto.value;
        
        if (radioMaiuscula.checked) {
            // Converte para maiúsculas
            resultado.textContent = texto.toUpperCase();
            resultado.style.color = '#667eea';
        } else if (radioMinuscula.checked) {
            // Converte para minúsculas
            resultado.textContent = texto.toLowerCase();
            resultado.style.color = '#764ba2';
        } else {
            // Nenhum radio selecionado
            resultado.textContent = 'Selecione uma opção acima';
            resultado.style.color = '#999';
        }
    }
    
    // Adiciona event listeners para os radio buttons
    radioMaiuscula.addEventListener('change', atualizarTexto);
    radioMinuscula.addEventListener('change', atualizarTexto);
    
    // Adiciona event listener para o input de texto (atualização em tempo real)
    inputTexto.addEventListener('input', atualizarTexto);
    
    // Inicializa o resultado
    atualizarTexto();
});