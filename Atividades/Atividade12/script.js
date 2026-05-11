// ============================================
// QUESTÃO 1: Função Construtora para Retângulo
// ============================================
function Retangulo(base, altura) {
    this.base = base;
    this.altura = altura;
    
    this.calcularArea = function() {
        return this.base * this.altura;
    };
    
    this.calcularPerimetro = function() {
        return 2 * (this.base + this.altura);
    };
}

function calcularAreaRetangulo() {
    const base = parseFloat(document.getElementById('base').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
        alert('Por favor, digite valores válidos para base e altura!');
        return;
    }
    
    // Criar objeto usando a função construtora
    const retangulo = new Retangulo(base, altura);
    const area = retangulo.calcularArea();
    const perimetro = retangulo.calcularPerimetro();
    
    // Exibir resultado
    const divResultado = document.getElementById('resultadoRetangulo');
    const divConteudo = document.getElementById('conteudoRetangulo');
    
    divConteudo.innerHTML = `
        <p><strong>Base:</strong> <span class="highlight">${retangulo.base.toFixed(2)}</span></p>
        <p><strong>Altura:</strong> <span class="highlight">${retangulo.altura.toFixed(2)}</span></p>
        <p><strong>Área:</strong> <span class="highlight">${area.toFixed(2)}</span></p>
        <p><strong>Perímetro:</strong> <span class="highlight">${perimetro.toFixed(2)}</span></p>
    `;
    
    divResultado.classList.add('show');
}

// ============================================
// QUESTÃO 2: Classes com Herança para Contas
// ============================================

// Classe base Conta
class Conta {
    constructor(nomeCorrentista, banco, numeroConta, saldo) {
        this._nomeCorrentista = nomeCorrentista;
        this._banco = banco;
        this._numeroConta = numeroConta;
        this._saldo = saldo;
    }
    
    // Getters e Setters
    get nomeCorrentista() {
        return this._nomeCorrentista;
    }
    
    set nomeCorrentista(valor) {
        this._nomeCorrentista = valor;
    }
    
    get banco() {
        return this._banco;
    }
    
    set banco(valor) {
        this._banco = valor;
    }
    
    get numeroConta() {
        return this._numeroConta;
    }
    
    set numeroConta(valor) {
        this._numeroConta = valor;
    }
    
    get saldo() {
        return this._saldo;
    }
    
    set saldo(valor) {
        if (valor >= 0) {
            this._saldo = valor;
        }
    }
    
    depositar(valor) {
        this._saldo += valor;
    }
    
    sacar(valor) {
        if (this._saldo >= valor) {
            this._saldo -= valor;
            return true;
        }
        return false;
    }
}

// Classe Corrente (herda de Conta)
class Corrente extends Conta {
    constructor(nomeCorrentista, banco, numeroConta, saldo, limiteEspecial) {
        super(nomeCorrentista, banco, numeroConta, saldo);
        this._limiteEspecial = limiteEspecial;
    }
    
    get limiteEspecial() {
        return this._limiteEspecial;
    }
    
    set limiteEspecial(valor) {
        this._limiteEspecial = valor;
    }
    
    get saldoTotal() {
        return this._saldo + this._limiteEspecial;
    }
    
    sacarComLimite(valor) {
        if (this.saldoTotal >= valor) {
            if (this._saldo >= valor) {
                this._saldo -= valor;
            } else {
                const restante = valor - this._saldo;
                this._saldo = 0;
                this._limiteEspecial -= restante;
            }
            return true;
        }
        return false;
    }
}

// Classe Poupanca (herda de Conta)
class Poupanca extends Conta {
    constructor(nomeCorrentista, banco, numeroConta, saldo, juros, dataVencimento) {
        super(nomeCorrentista, banco, numeroConta, saldo);
        this._juros = juros;
        this._dataVencimento = dataVencimento;
    }
    
    get juros() {
        return this._juros;
    }
    
    set juros(valor) {
        this._juros = valor;
    }
    
    get dataVencimento() {
        return this._dataVencimento;
    }
    
    set dataVencimento(valor) {
        this._dataVencimento = valor;
    }
    
    calcularRendimento() {
        return this._saldo * (this._juros / 100);
    }
    
    get saldoComRendimento() {
        return this._saldo + this.calcularRendimento();
    }
}

function criarContaCorrente() {
    const nome = document.getElementById('nomeCorrente').value;
    const banco = document.getElementById('bancoCorrente').value;
    const numero = document.getElementById('numeroCorrente').value;
    const saldo = parseFloat(document.getElementById('saldoCorrente').value);
    const limite = parseFloat(document.getElementById('limiteEspecial').value);
    
    if (!nome || !banco || !numero || isNaN(saldo) || isNaN(limite)) {
        alert('Por favor, preencha todos os campos da conta corrente!');
        return;
    }
    
    // Criar objeto Conta Corrente
    const contaCorrente = new Corrente(nome, banco, numero, saldo, limite);
    
    // Exibir resultado
    const divResultado = document.getElementById('resultadoCorrente');
    const divConteudo = document.getElementById('conteudoCorrente');
    
    divConteudo.innerHTML = `
        <p><strong>Nome:</strong> <span class="highlight">${contaCorrente.nomeCorrentista}</span></p>
        <p><strong>Banco:</strong> <span class="highlight">${contaCorrente.banco}</span></p>
        <p><strong>Número da Conta:</strong> <span class="highlight">${contaCorrente.numeroConta}</span></p>
        <p><strong>Saldo:</strong> <span class="highlight">R$ ${contaCorrente.saldo.toFixed(2)}</span></p>
        <p><strong>Limite Especial:</strong> <span class="highlight">R$ ${contaCorrente.limiteEspecial.toFixed(2)}</span></p>
        <p><strong>Saldo Total Disponível:</strong> <span class="highlight">R$ ${contaCorrente.saldoTotal.toFixed(2)}</span></p>
    `;
    
    divResultado.classList.add('show');
}

function criarContaPoupanca() {
    const nome = document.getElementById('nomePoupanca').value;
    const banco = document.getElementById('bancoPoupanca').value;
    const numero = document.getElementById('numeroPoupanca').value;
    const saldo = parseFloat(document.getElementById('saldoPoupanca').value);
    const juros = parseFloat(document.getElementById('jurosPoupanca').value);
    const dataVenc = document.getElementById('dataVencimento').value;
    
    if (!nome || !banco || !numero || isNaN(saldo) || isNaN(juros) || !dataVenc) {
        alert('Por favor, preencha todos os campos da conta poupança!');
        return;
    }
    
    // Criar objeto Conta Poupança
    const contaPoupanca = new Poupanca(nome, banco, numero, saldo, juros, dataVenc);
    
    // Formatando data
    const dataFormatada = new Date(dataVenc).toLocaleDateString('pt-BR');
    
    // Exibir resultado
    const divResultado = document.getElementById('resultadoPoupanca');
    const divConteudo = document.getElementById('conteudoPoupanca');
    
    divConteudo.innerHTML = `
        <p><strong>Nome:</strong> <span class="highlight">${contaPoupanca.nomeCorrentista}</span></p>
        <p><strong>Banco:</strong> <span class="highlight">${contaPoupanca.banco}</span></p>
        <p><strong>Número da Conta:</strong> <span class="highlight">${contaPoupanca.numeroConta}</span></p>
        <p><strong>Saldo:</strong> <span class="highlight">R$ ${contaPoupanca.saldo.toFixed(2)}</span></p>
        <p><strong>Taxa de Juros:</strong> <span class="highlight">${contaPoupanca.juros}%</span></p>
        <p><strong>Rendimento Mensal:</strong> <span class="highlight">R$ ${contaPoupanca.calcularRendimento().toFixed(2)}</span></p>
        <p><strong>Saldo com Rendimento:</strong> <span class="highlight">R$ ${contaPoupanca.saldoComRendimento.toFixed(2)}</span></p>
        <p><strong>Data de Vencimento:</strong> <span class="highlight">${dataFormatada}</span></p>
    `;
    
    divResultado.classList.add('show');
}