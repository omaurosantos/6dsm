// Importa as ferramentas de teste e validação do Playwright
const { test, expect } = require('@playwright/test');

// Função auxiliar para abrir a tela de login
async function abrirTelaDeLogin(page) {

    // Abre o arquivo index.html usando o endereço do Live Server
    await page.goto('/index.html');
}

// Função auxiliar para preencher o formulário de login
async function preencherLogin(page, usuario, senha) {

    // Localiza o campo usuário e preenche com o valor recebido
    await page.locator('#usuario').fill(usuario);

    // Localiza o campo senha e preenche com o valor recebido
    await page.locator('#senha').fill(senha);

    // Localiza o botão Entrar e clica nele
    await page.locator('#btnEntrar').click();
}

// Teste 1: verifica login com dados corretos
test('CT01 - Deve realizar login com usuário e senha corretos', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Preenche usuário e senha corretos
    await preencherLogin(page, 'admin', '123456');

    // Confere se a mensagem de sucesso apareceu corretamente
    await expect(page.locator('#mensagem')).toHaveText('Login realizado com sucesso.');
});

// Teste 2: verifica se o sistema bloqueia usuário vazio
test('CT02 - Deve bloquear login com usuário vazio', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Deixa o usuário vazio e preenche a senha
    await preencherLogin(page, '', '123456');

    // Confere se a mensagem de usuário obrigatório apareceu corretamente
    await expect(page.locator('#mensagem')).toHaveText('O campo usuário é obrigatório.');
});

// Teste 3: verifica se o sistema bloqueia senha vazia
test('CT03 - Deve bloquear login com senha vazia', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Preenche o usuário e deixa a senha vazia
    await preencherLogin(page, 'admin', '');

    // Confere se a mensagem de senha obrigatória apareceu corretamente
    await expect(page.locator('#mensagem')).toHaveText('O campo senha é obrigatório.');
});

// Teste 4: verifica se o sistema bloqueia usuário incorreto
test('CT04 - Deve bloquear login com usuário incorreto', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Preenche usuário errado e senha correta
    await preencherLogin(page, 'aluno', '123456');

    // Confere se a mensagem de dados inválidos apareceu corretamente
    await expect(page.locator('#mensagem')).toHaveText('Usuário ou senha inválidos.');
});

// Teste 5: verifica se o sistema bloqueia senha incorreta
test('CT05 - Deve bloquear login com senha incorreta', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Preenche usuário correto e senha errada
    await preencherLogin(page, 'admin', '000000');

    // Confere se a mensagem de dados inválidos apareceu corretamente
    await expect(page.locator('#mensagem')).toHaveText('Usuário ou senha inválidos.');
});

// Teste 6: verifica usuário e senha vazios
test('CT06 - Deve validar primeiro o usuário quando os dois campos estiverem vazios', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Deixa usuário e senha vazios
    await preencherLogin(page, '', '');

    // Como a regra valida primeiro o usuário, essa deve ser a mensagem exibida
    await expect(page.locator('#mensagem')).toHaveText('O campo usuário é obrigatório.');
});

// Teste 7: verifica se espaços antes e depois do usuário são removidos
test('CT07 - Deve permitir login com espaços antes e depois do usuário', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Preenche o usuário com espaços e a senha correta
    await preencherLogin(page, '   admin   ', '123456');

    // Como o sistema remove espaços, o login deve funcionar
    await expect(page.locator('#mensagem')).toHaveText('Login realizado com sucesso.');
});

// Teste 8: verifica se o usuário em maiúsculo é bloqueado
test('CT08 - Deve bloquear usuário em letras maiúsculas', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Preenche ADMIN em maiúsculo e senha correta
    await preencherLogin(page, 'ADMIN', '123456');

    // Como ADMIN é diferente de admin, o sistema deve bloquear
    await expect(page.locator('#mensagem')).toHaveText('Usuário ou senha inválidos.');
});

// Teste 9: verifica se a senha está oculta
test('CT09 - Campo senha deve ocultar os caracteres digitados', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Confere se o campo senha usa type password
    await expect(page.locator('#senha')).toHaveAttribute('type', 'password');
});

// Teste 10: verifica se a mensagem de erro usa classe visual correta
test('CT10 - Mensagem de erro deve usar a classe erro', async ({ page }) => {

    // Abre a tela de login
    await abrirTelaDeLogin(page);

    // Preenche dados inválidos
    await preencherLogin(page, 'teste', 'teste');

    // Confere se a área da mensagem recebeu a classe erro
    await expect(page.locator('#mensagem')).toHaveClass(/erro/);
});
