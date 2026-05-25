function validar() {
    // Acessando elementos usando document.nomeform.elements[]
    var form = document.nomeform;
    var nome = form.elements['nome'].value;
    var email = form.elements['email'].value;
    var comentario = form.elements['comentario'].value;
    var pesquisa = form.elements['pesquisa'];
    
    // Validação do Nome - mínimo 10 caracteres
    if (nome.length < 10) {
        alert("Nome deve ter pelo menos 10 caracteres!");
        form.elements['nome'].focus();
        return false;
    }
    
    // Validação do Email - verifica se está vazio
    if (email.trim() === "") {
        alert("E-mail é obrigatório!");
        form.elements['email'].focus();
        return false;
    }
    
    // Validação do Comentário - mínimo 20 caracteres
    if (comentario.length < 20) {
        alert("Comentário deve ter pelo menos 20 caracteres!");
        form.elements['comentario'].focus();
        return false;
    }
    
    // Validação da Pesquisa - verificando se algum radio foi selecionado
    var pesquisaSelecionada = false;
    for (var i = 0; i < pesquisa.length; i++) {
        if (pesquisa[i].checked) {
            pesquisaSelecionada = true;
            break;
        }
    }
    
    if (!pesquisaSelecionada) {
        alert("Por favor, responda a pergunta de pesquisa!");
        return false;
    }
    
    // Mensagens baseadas na resposta da pesquisa
    // Usando document.nomeform.elements[] para acessar
    if (form.elements['pesquisa'][0].checked) {
        // Se marcou "Sim" - primeira vez
        alert("Que bom que você voltou a visitar esta página!");
    } else {
        // Se marcou "Não" - não é primeira vez
        alert("Volte sempre à está página!");
    }
    
    // Se chegou aqui, validação passou
    return true;
}