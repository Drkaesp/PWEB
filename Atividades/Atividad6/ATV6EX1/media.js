function calcularMedia() {
    // Lê o nome do aluno
    let nome = prompt("Digite o nome do aluno:");
    
    // Verifica se o usuário cancelou ou não digitou nada
    if (nome === null || nome.trim() === "") {
        alert("Operação cancelada ou nome inválido!");
        return;
    }
    
    // Lê as quatro notas
    let nota1 = parseFloat(prompt("Digite a primeira nota de " + nome + ":"));
    let nota2 = parseFloat(prompt("Digite a segunda nota de " + nome + ":"));
    let nota3 = parseFloat(prompt("Digite a terceira nota de " + nome + ":"));
    let nota4 = parseFloat(prompt("Digite a quarta nota de " + nome + ":"));
    
    // Verifica se todas as notas são válidas
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
        alert("Por favor, digite notas válidas (números)!");
        return;
    }
    
    // Calcula a média aritmética
    let media = (nota1 + nota2 + nota3 + nota4) / 4;
    
    // Prepara a mensagem de resultado
    let mensagem = "=== BOLETIM ESCOLAR ===\n\n";
    mensagem += "Aluno: " + nome + "\n";
    mensagem += "Nota 1: " + nota1.toFixed(1) + "\n";
    mensagem += "Nota 2: " + nota2.toFixed(1) + "\n";
    mensagem += "Nota 3: " + nota3.toFixed(1) + "\n";
    mensagem += "Nota 4: " + nota4.toFixed(1) + "\n";
    mensagem += "\nMédia Final: " + media.toFixed(1) + "\n\n";
    
    // Verifica se foi aprovado ou reprovado
    if (media >= 7) {
        mensagem += "Situação: APROVADO! 🎉";
        mostrarResultado(mensagem, "aprovado");
    } else if (media >= 5) {
        mensagem += "Situação: RECUPERAÇÃO ⚠️";
        mostrarResultado(mensagem, "recuperacao");
    } else {
        mensagem += "Situação: REPROVADO 😢";
        mostrarResultado(mensagem, "reprovado");
    }
    
    // Mostra o resultado no alert
    alert(mensagem);
}

function mostrarResultado(mensagem, situacao) {
    let divResultado = document.getElementById("resultado");
    if (divResultado) {
        divResultado.innerHTML = mensagem.replace(/\n/g, "<br>");
        divResultado.className = situacao;
    }
}