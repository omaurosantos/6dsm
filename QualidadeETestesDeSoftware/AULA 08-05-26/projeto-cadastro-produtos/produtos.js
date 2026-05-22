// Pega o botão Salvar pelo ID.
var botaoSalvar = document.getElementById("btnSalvar");

// Pega o formulário pelo ID.
var formularioProduto = document.getElementById("formProduto");

// Pega a área de mensagem pelo ID.
var areaMensagem = document.getElementById("mensagem");

// Guarda os nomes dos produtos já cadastrados nesta sessão.
var produtosCadastrados = [];

// Adiciona um evento de clique ao botão Salvar.
botaoSalvar.addEventListener("click", validarCadastroProduto);

// Adiciona um evento ao limpar o formulário.
formularioProduto.addEventListener("reset", limparMensagem);

// Função responsável por validar o cadastro do produto.
function validarCadastroProduto() {

    // Pega o valor digitado no campo nome do produto.
    var nomeProduto = document.getElementById("nomeProduto").value;

    // Pega o valor selecionado no campo categoria.
    var categoria = document.getElementById("categoria").value;

    // Pega o valor digitado no campo preço.
    var precoTexto = document.getElementById("preco").value;

    // Pega o valor digitado no campo quantidade.
    var quantidadeTexto = document.getElementById("quantidade").value;

    // Pega o valor digitado no campo descrição.
    var descricao = document.getElementById("descricao").value;

    // Pega o valor selecionado no campo status.
    var statusProduto = document.getElementById("status").value;

    // Remove espaços antes e depois do nome.
    nomeProduto = nomeProduto.trim();

    // Remove espaços antes e depois da descrição.
    descricao = descricao.trim();

    // Limpa a mensagem antes de iniciar uma nova validação.
    limparMensagem();

    // Verifica se o nome do produto está vazio.
    if (nomeProduto == "") {
        mostrarErro("O nome do produto é obrigatório.");
        return;
    }

    // Verifica se o nome possui menos de 3 caracteres.
    if (nomeProduto.length < 3) {
        mostrarErro("O nome do produto deve ter no mínimo 3 caracteres.");
        return;
    }

    // Verifica se o nome possui mais de 80 caracteres.
    if (nomeProduto.length > 80) {
        mostrarErro("O nome do produto deve ter no máximo 80 caracteres.");
        return;
    }

    // Verifica se a categoria foi selecionada.
    if (categoria == "") {
        mostrarErro("A categoria é obrigatória.");
        return;
    }

    // Verifica se o preço foi informado.
    if (precoTexto == "") {
        mostrarErro("O preço é obrigatório.");
        return;
    }

    // Converte o preço de texto para número decimal.
    var preco = parseFloat(precoTexto);

    // Verifica se o preço é menor ou igual a zero.
    if (preco <= 0) {
        mostrarErro("O preço deve ser maior que zero.");
        return;
    }

    // Verifica se o preço é maior que o limite permitido.
    if (preco > 9999.99) {
        mostrarErro("O preço não pode ser maior que 9999.99.");
        return;
    }

    // Verifica se a quantidade foi informada.
    if (quantidadeTexto == "") {
        mostrarErro("A quantidade em estoque é obrigatória.");
        return;
    }

    // Converte a quantidade de texto para número inteiro.
    var quantidade = parseInt(quantidadeTexto);

    // Verifica se a quantidade digitada não é um número inteiro válido.
    if (quantidade.toString() != quantidadeTexto) {
        mostrarErro("A quantidade em estoque deve ser um número inteiro.");
        return;
    }

    // Verifica se a quantidade é negativa.
    if (quantidade < 0) {
        mostrarErro("A quantidade em estoque não pode ser negativa.");
        return;
    }

    // Verifica se a quantidade é maior que o limite permitido.
    if (quantidade > 999) {
        mostrarErro("A quantidade em estoque não pode ser maior que 999.");
        return;
    }

    // Verifica se a descrição ultrapassou 300 caracteres.
    if (descricao.length > 300) {
        mostrarErro("A descrição deve ter no máximo 300 caracteres.");
        return;
    }

    // Verifica se o status foi selecionado.
    if (statusProduto == "") {
        mostrarErro("O status do produto é obrigatório.");
        return;
    }

    // Verifica se produto inativo possui estoque maior que zero.
    if (statusProduto == "Inativo" && quantidade > 0) {
        mostrarErro("Produto inativo não pode ter estoque maior que zero.");
        return;
    }

    // Verifica se já existe produto cadastrado com o mesmo nome.
    var nomeProdutoNormalizado = nomeProduto.toLowerCase();

    if (produtosCadastrados.includes(nomeProdutoNormalizado)) {
        mostrarErro("Já existe um produto cadastrado com este nome.");
        return;
    }

    // Guarda o produto cadastrado.
    produtosCadastrados.push(nomeProdutoNormalizado);

    // Se todas as validações passaram, mostra mensagem de sucesso.
    mostrarSucesso("Produto cadastrado com sucesso.");
}

// Função responsável por mostrar mensagem de erro.
function mostrarErro(textoMensagem) {

    // Coloca o texto da mensagem na área de mensagem.
    areaMensagem.innerHTML = textoMensagem;

    // Remove a classe de sucesso, caso exista.
    areaMensagem.classList.remove("sucesso");

    // Adiciona a classe de erro.
    areaMensagem.classList.add("erro");
}

// Função responsável por mostrar mensagem de sucesso.
function mostrarSucesso(textoMensagem) {

    // Coloca o texto da mensagem na área de mensagem.
    areaMensagem.innerHTML = textoMensagem;

    // Remove a classe de erro, caso exista.
    areaMensagem.classList.remove("erro");

    // Adiciona a classe de sucesso.
    areaMensagem.classList.add("sucesso");
}

// Função responsável por limpar a mensagem da tela.
function limparMensagem() {

    // Limpa o texto da mensagem.
    areaMensagem.innerHTML = "";

    // Remove a classe de erro.
    areaMensagem.classList.remove("erro");

    // Remove a classe de sucesso.
    areaMensagem.classList.remove("sucesso");
}
