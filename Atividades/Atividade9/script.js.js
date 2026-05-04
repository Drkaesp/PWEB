// =====================================================
// EXERCÍCIO 1: Maior de três números
// =====================================================
function encontrarMaiorTres(num1, num2, num3) {
    return Math.max(num1, num2, num3);
}

function testarMaiorTres() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const num3 = parseFloat(document.getElementById('num3').value);
    
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        mostrarResultado('resultado1', 'Por favor, digite três números válidos!', 'erro');
        return;
    }
    
    const maior = encontrarMaiorTres(num1, num2, num3);
    mostrarResultado('resultado1', `O maior número é: ${maior}`, 'sucesso');
}

// =====================================================
// EXERCÍCIO 2: Ordenar três números em ordem crescente
// =====================================================
function ordenarTresNumeros(num1, num2, num3) {
    const array = [num1, num2, num3];
    array.sort((a, b) => a - b); // Ordenação numérica correta
    return array;
}

function testarOrdenar() {
    const num1 = parseFloat(document.getElementById('num4').value);
    const num2 = parseFloat(document.getElementById('num5').value);
    const num3 = parseFloat(document.getElementById('num6').value);
    
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        mostrarResultado('resultado2', 'Por favor, digite três números válidos!', 'erro');
        return;
    }
    
    const ordenados = ordenarTresNumeros(num1, num2, num3);
    mostrarResultado('resultado2', `Ordem crescente: ${ordenados.join(' < ')}`, 'sucesso');
}

// =====================================================
// EXERCÍCIO 3: Verificar se é palíndromo
// =====================================================
function verificarPalindromo(texto) {
    // Converte para minúsculas e remove espaços em branco
    const textoLimpo = texto.toLowerCase().replace(/\s/g, '');
    
    // Inverte a string
    const textoInvertido = textoLimpo.split('').reverse().join('');
    
    // Compara
    return textoLimpo === textoInvertido;
}

function testarPalindromo() {
    const texto = document.getElementById('textoPalindromo').value;
    
    if (!texto.trim()) {
        mostrarResultado('resultado3', 'Por favor, digite uma palavra ou frase!', 'erro');
        return;
    }
    
    const ePalindromo = verificarPalindromo(texto);
    
    if (ePalindromo) {
        mostrarResultado('resultado3', `"${texto}" É UM PALÍNDROMO! ✅`, 'sucesso');
    } else {
        mostrarResultado('resultado3', `"${texto}" NÃO É UM PALÍNDROMO! ❌`, 'erro');
    }
}

// =====================================================
// EXERCÍCIO 4: Verificar subconjunto (substring)
// =====================================================
function verificarSubconjunto(palavra1, palavra2) {
    // Verifica se são vazias ou undefined
    if (!palavra1 || !palavra2 || palavra1.trim() === '' || palavra2.trim() === '') {
        return 'erro';
    }
    
    // Converte para minúsculas para comparação case-insensitive
    const str1 = palavra1.toLowerCase();
    const str2 = palavra2.toLowerCase();
    
    // Verifica se a segunda palavra está contida na primeira
    if (str1.includes(str2)) {
        return 'é um subconjunto';
    } else {
        return 'não é um subconjunto';
    }
}

function testarSubconjunto() {
    const palavra1 = document.getElementById('palavra1').value;
    const palavra2 = document.getElementById('palavra2').value;
    
    const resultado = verificarSubconjunto(palavra1, palavra2);
    
    if (resultado === 'erro') {
        mostrarResultado('resultado4', '⚠️ ERRO: Uma ou ambas as palavras estão vazias!', 'erro');
    } else if (resultado === 'é um subconjunto') {
        mostrarResultado('resultado4', `"${palavra2}" é um subconjunto de "${palavra1}" ✅`, 'sucesso');
    } else {
        mostrarResultado('resultado4', `"${palavra2}" não é um subconjunto de "${palavra1}" ❌`, 'info');
    }
}

// =====================================================
// EXERCÍCIO 5: Retornar o dia da semana de uma data
// =====================================================
function obterDiaSemana(data) {
    const diasSemana = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ];
    
    const dataObj = new Date(data + 'T00:00:00'); // Adiciona hora para evitar problemas de fuso
    const diaSemana = dataObj.getDay();
    
    return diasSemana[diaSemana];
}

function testarDiaSemana() {
    const data = document.getElementById('dataSemana').value;
    
    if (!data) {
        mostrarResultado('resultado5', 'Por favor, selecione uma data!', 'erro');
        return;
    }
    
    const diaSemana = obterDiaSemana(data);
    const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    
    mostrarResultado('resultado5', `📅 ${dataFormatada} cai em uma ${diaSemana}`, 'sucesso');
}

// =====================================================
// FUNÇÃO AUXILIAR: Mostrar resultado na tela
// =====================================================
function mostrarResultado(elementId, mensagem, tipo) {
    const elemento = document.getElementById(elementId);
    elemento.textContent = mensagem;
    elemento.className = `resultado show ${tipo}`;
}