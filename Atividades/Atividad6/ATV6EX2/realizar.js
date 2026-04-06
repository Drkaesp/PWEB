function realizarOperacoes() {
    // Lê o primeiro número
    let num1 = parseFloat(prompt("Digite o primeiro número:"));
    
    // Verifica se o usuário cancelou ou digitou algo inválido
    if (isNaN(num1)) {
        alert("Por favor, digite um número válido!");
        return;
    }
    
    // Lê o segundo número
    let num2 = parseFloat(prompt("Digite o segundo número:"));
    
    // Verifica se o usuário cancelou ou digitou algo inválido
    if (isNaN(num2)) {
        alert("Por favor, digite um número válido!");
        return;
    }
    
    // Realiza as operações
    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let produto = num1 * num2;
    let divisao = num1 / num2;
    let resto = num1 % num2;
    
    // Prepara a mensagem de resultado
    let resultado = "=== RESULTADO DAS OPERAÇÕES ===\n\n";
    resultado += "Números: " + num1 + " e " + num2 + "\n\n";
    resultado += "✓ Soma: " + num1 + " + " + num2 + " = " + soma + "\n";
    resultado += "✓ Subtração: " + num1 + " - " + num2 + " = " + subtracao + "\n";
    resultado += "✓ Multiplicação: " + num1 + " × " + num2 + " = " + produto + "\n";
    resultado += "✓ Divisão: " + num1 + " ÷ " + num2 + " = " + divisao.toFixed(2) + "\n";
    resultado += "✓ Resto da divisão: " + num1 + " % " + num2 + " = " + resto + "\n";
    
    // Verifica se a divisão é por zero
    if (num2 === 0) {
        resultado += "\n⚠️ Atenção: Divisão por zero não é permitida!";
    }
    
    // Mostra o resultado no alert
    alert(resultado);
    
    // Também mostra na página
    mostrarNaPagina(num1, num2, soma, subtracao, produto, divisao, resto);
}

function mostrarNaPagina(num1, num2, soma, subtracao, produto, divisao, resto) {
    let divResultado = document.getElementById("resultado");
    if (divResultado) {
        divResultado.innerHTML = `
            <div class="operacao"><strong>Soma:</strong> ${num1} + ${num2} = ${soma}</div>
            <div class="operacao"><strong>Subtração:</strong> ${num1} - ${num2} = ${subtracao}</div>
            <div class="operacao"><strong>Multiplicação:</strong> ${num1} × ${num2} = ${produto}</div>
            <div class="operacao"><strong>Divisão:</strong> ${num1} ÷ ${num2} = ${divisao.toFixed(2)}</div>
            <div class="operacao"><strong>Resto:</strong> ${num1} % ${num2} = ${resto}</div>
        `;
    }
}