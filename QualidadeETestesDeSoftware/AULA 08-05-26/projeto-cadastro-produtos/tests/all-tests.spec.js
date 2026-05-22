// Importa as ferramentas do Playwright.
// O "test" cria um teste automatizado.
// O "expect" verifica se o resultado esperado aconteceu.
const { test, expect } = require("@playwright/test");
// Define a URL da página de cadastro de produtos.
// A porta deve ser ajustada conforme o Live Server.
const urlCadastroProduto = "http://127.0.0.1:5500/produtos.html";
// Função auxiliar para abrir a tela de cadastro.
// Ela evita repetir o mesmo código em todos os testes.
async function abrirTelaCadastro(page) {
  // Abre a tela de cadastro de produtos.
  await page.goto(urlCadastroProduto);
  // Verifica se o campo nome está visível.
  await expect(page.locator("#nomeProduto")).toBeVisible();
  // Verifica se o campo categoria está visível.
  await expect(page.locator("#categoria")).toBeVisible();
  // Verifica se o campo preço está visível.
  await expect(page.locator("#preco")).toBeVisible();
  // Verifica se o campo quantidade está visível.
  await expect(page.locator("#quantidade")).toBeVisible();
  // Verifica se o botão salvar está visível.
  await expect(page.locator("#btnSalvar")).toBeVisible();
}
// Função auxiliar para preencher o formulário.
// Ela recebe os dados do produto e coloca cada valor no campo correto.
async function preencherProduto(
  page,
  nome,
  categoria,
  preco,
  quantidade,
  descricao,
  status,
) {
  // Preenche o campo nome do produto.
  await page.locator("#nomeProduto").fill(nome);
  // Seleciona a categoria do produto quando houver valor.
  if (categoria != "") {
    await page.locator("#categoria").selectOption(categoria);
  }
  // Preenche o preço do produto.
  await page.locator("#preco").fill(preco);
  // Preenche a quantidade em estoque.
  await page.locator("#quantidade").fill(quantidade);
  // Preenche a descrição do produto.
  await page.locator("#descricao").fill(descricao);
  // Seleciona o status do produto quando houver valor.
  if (status != "") {
    await page.locator("#status").selectOption(status);
  }
}
// Função auxiliar para clicar no botão salvar.
async function salvarProduto(page) {
  // Clica no botão salvar.
  await page.locator("#btnSalvar").click();
}

// CT01 - Produto Válido
test('CT01 - Produto válido deve ser cadastrado com sucesso', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário com dados válidos.
 await preencherProduto(page, 'Mouse sem fio', 'Eletrônicos', '59.90', '10', 'Mouse sem fio com conexão USB', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem de sucesso apareceu.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
});

// CT02 - Nome vazio
test('CT02 - Nome vazio deve exibir mensagem obrigatória', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o nome vazio.
 await preencherProduto(page, '', 'Eletrônicos', '59.90', '10', 'Produto para teste', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O nome do produto é obrigatório.');
});

// CT03 - Nome abaixo do tamanho mínimo
test('CT03 - O nome do produto deve ter no mínimo 3 caracteres.', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o nome com "TV" (menos de 3 caracteres)..
 await preencherProduto(page, 'TV', 'Eletrônicos', '900.00', '5', 'Televisor', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O nome do produto deve ter no mínimo 3 caracteres.');
});

// CT04 - Nome no limite mínimo
test('CT04 - Nome no limite mínimo deve ser cadastrado com sucesso', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o nome com "Fio" (3 caracteres)..
 await preencherProduto(page, 'Fio', 'Acessórios', '9.90', '20', 'Fio para teste', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
});

// CT05 - Nome acima do tamanho máximo
test('CT05 - Nome acima do tamanho máximo deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o nome com um texto muito grande.
 await preencherProduto(page, 'Produto com nome extremamente grande ultrapassando o limite permitido pelo sistema de cadastro',
   'Casa', '20', '3', 'Produto para teste', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O nome do produto deve ter no máximo 80 caracteres.');
});

// CT06 - Cadastro sem selecionar categoria
test('CT06 - Cadastro sem selecionar categoria deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando a categoria vazia.
 await preencherProduto(page, 'Escova de cabelo', '', '15.90', '8', 'Escova simples', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('A categoria é obrigatória.');
});