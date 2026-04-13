// Pontos do jogo
let pontosEu = 0;
let pontosComp = 0;

// Função principal - jogada
function jogar(minhaEscolha) {
    // Computador escolhe aleatoriamente
    var aleatorio = Math.random(); // número de 0 até 0.99...
    
    var escolhaComp;
    
    // Dividindo em 3 partes iguais
    if (aleatorio < 0.33) {
        escolhaComp = 'pedra';
    } else if (aleatorio < 0.66) {
        escolhaComp = 'papel';
    } else {
        escolhaComp = 'tesoura';
    }
    
    // Mostra o que o computador escolheu
    document.getElementById('escolha-comp').textContent = escolhaComp;
    
    // Vê quem ganhou
    var resultado;
    
    if (minhaEscolha === escolhaComp) {
        resultado = 'empate';
    } else if (
        (minhaEscolha === 'pedra' && escolhaComp === 'tesoura') ||
        (minhaEscolha === 'papel' && escolhaComp === 'pedra') ||
        (minhaEscolha === 'tesoura' && escolhaComp === 'papel')
    ) {
        resultado = 'vitoria';
    } else {
        resultado = 'derrota';
    }
    
    // Atualiza o placar
    if (resultado === 'vitoria') {
        pontosEu++;
        document.getElementById('pontos-jogador').textContent = pontosEu;
    } else if (resultado === 'derrota') {
        pontosComp++;
        document.getElementById('pontos-computador').textContent = pontosComp;
    }
    
    // Mostra o resultado na tela
    var caixaResultado = document.getElementById('resultado');
    caixaResultado.className = 'resultado'; // limpa as classes anteriores
    
    if (resultado === 'vitoria') {
        caixaResultado.classList.add('vitoria');
        caixaResultado.innerHTML = '<p>✅ Você ganhou! ' + minhaEscolha + ' vence ' + escolhaComp + '</p>';
    } else if (resultado === 'derrota') {
        caixaResultado.classList.add('derrota');
        caixaResultado.innerHTML = '<p>❌ Você perdeu! ' + escolhaComp + ' vence ' + minhaEscolha + '</p>';
    } else {
        caixaResultado.classList.add('empate');
        caixaResultado.innerHTML = '<p>🤝 Empate! Os dois escolheram ' + minhaEscolha + '</p>';
    }
}

// Função pra zerar o placar
function zerar() {
    pontosEu = 0;
    pontosComp = 0;
    
    document.getElementById('pontos-jogador').textContent = '0';
    document.getElementById('pontos-computador').textContent = '0';
    document.getElementById('escolha-comp').textContent = '?';
    
    var caixaResultado = document.getElementById('resultado');
    caixaResultado.className = 'resultado';
    caixaResultado.innerHTML = '<p>Faça sua escolha!</p>';
}