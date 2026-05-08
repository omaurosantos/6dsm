// Importa os recursos de teste e validação do Playwright
const { test, expect } = require('@playwright/test');
// Endereço da página que será testada
const urlLogin = 'http://127.0.0.1:5500/index.html';
// Caso de teste automatizado para login válido
test('CT01 - Login válido', async ({ page }) => {
 // Abre a página de login no navegador controlado pelo Playwright
 await page.goto(urlLogin);
 // Localiza o campo usuário pelo ID e preenche com admin
 await page.locator('#usuario').fill('admin');
 // Localiza o campo senha pelo ID e preenche com 123456
 await page.locator('#senha').fill('123456');
 // Localiza o botão Entrar pelo ID e realiza o clique
 await page.locator('#btnEntrar').click();
 // Verifica se a mensagem exibida é exatamente a esperada
 await expect(page.locator('#mensagem')).toHaveText('Login realizado com sucesso.');
});