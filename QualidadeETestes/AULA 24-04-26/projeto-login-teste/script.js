// Pega o formulário de login pelo ID informado no HTML
var formularioLogin = document.getElementById("formLogin");

// Adiciona um evento ao formulário para controlar o envio
formularioLogin.addEventListener("submit", function (evento) {

    // Impede que a página recarregue quando o botão Entrar for clicado
    evento.preventDefault();

    // Chama a função que valida o login
    realizarLogin();
});

// Função responsável por realizar a validação do login
function realizarLogin() {

    // Pega o campo de usuário pelo ID informado no HTML
    var campoUsuario = document.getElementById("usuario");

    // Pega o campo de senha pelo ID informado no HTML
    var campoSenha = document.getElementById("senha");

    // Pega a área onde será exibida a mensagem para o usuário
    var areaMensagem = document.getElementById("mensagem");

    // Pega o valor digitado no campo usuário
    var usuarioDigitado = campoUsuario.value;

    // Pega o valor digitado no campo senha
    var senhaDigitada = campoSenha.value;

    // Remove espaços em branco antes e depois do usuário
    usuarioDigitado = usuarioDigitado.trim();

    // Remove espaços em branco antes e depois da senha
    senhaDigitada = senhaDigitada.trim();

    // Limpa mensagens anteriores antes de fazer uma nova validação
    areaMensagem.innerHTML = "";

    // Remove a classe de erro caso ela exista de uma tentativa anterior
    areaMensagem.classList.remove("erro");

    // Remove a classe de sucesso caso ela exista de uma tentativa anterior
    areaMensagem.classList.remove("sucesso");

    // Verifica se o campo usuário está vazio
    if (usuarioDigitado == "") {

        // Exibe mensagem de erro para o usuário
        areaMensagem.innerHTML = "O campo usuário é obrigatório.";

        // Aplica a classe visual de erro
        areaMensagem.classList.add("erro");

        // Para a execução da função
        return;
    }

    // Verifica se o campo senha está vazio
    if (senhaDigitada == "") {

        // Exibe mensagem de erro para o usuário
        areaMensagem.innerHTML = "O campo senha é obrigatório.";

        // Aplica a classe visual de erro
        areaMensagem.classList.add("erro");

        // Para a execução da função
        return;
    }

    // Verifica se o usuário e a senha estão corretos
    if (usuarioDigitado == "admin" && senhaDigitada == "123456") {

        // Exibe mensagem de sucesso
        areaMensagem.innerHTML = "Login realizado com sucesso.";

        // Aplica a classe visual de sucesso
        areaMensagem.classList.add("sucesso");

        // Para a execução da função
        return;
    }

    // Se chegou aqui, o usuário ou a senha estão incorretos
    areaMensagem.innerHTML = "Usuário ou senha inválidos.";

    // Aplica a classe visual de erro
    areaMensagem.classList.add("erro");
}
