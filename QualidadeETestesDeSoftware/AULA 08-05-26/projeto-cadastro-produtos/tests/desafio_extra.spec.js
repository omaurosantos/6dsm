// Importa as ferramentas do Playwright.
// O "test" cria um teste automatizado.
// O "expect" verifica se o resultado esperado aconteceu.
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
// Define a URL da página de cadastro de produtos.
// A porta deve ser ajustada conforme o Live Server.
const urlCadastroProduto = "http://127.0.0.1:5500/produtos.html";
const pastaEvidencias = path.join(__dirname, "..", "evidencias");

// Tira um print no fim de cada teste, usando o ID do caso como nome do arquivo.
test.afterEach(async ({ page }, testInfo) => {
  fs.mkdirSync(pastaEvidencias, { recursive: true });

  const idCasoTeste = testInfo.title.match(/CT\d{2}/)?.[0] || "teste";
  const status = testInfo.status === "passed" ? "aprovado" : "reprovado";
  const caminhoPrint = path.join(pastaEvidencias, `${idCasoTeste}-${status}.png`);

  await page.screenshot({
    path: caminhoPrint,
    fullPage: true,
  });
});

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

// Função auxiliar para clicar no botão limpar.
async function limparFormulario(page) {
  // Clica no botão limpar.
  await page.locator("#btnLimpar").click();
}

// CT21 - Botão limpar formulário
test('CT21 - Botão limpar formulário deve apagar todos os campos', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário com dados válidos.
 await preencherProduto(page, 'Mouse sem fio', 'Eletrônicos', '59.90', '10', 'Mouse sem fio com conexão USB', 'Ativo');
 // Clica em limpar.
 await limparFormulario(page);
 // Verifica se limpou todos os campos do formulário.
 await expect(page.locator("#nomeProduto")).toHaveValue("");
 await expect(page.locator("#categoria")).toHaveValue("");
 await expect(page.locator("#preco")).toHaveValue("");
 await expect(page.locator("#quantidade")).toHaveValue("");
 await expect(page.locator("#descricao")).toHaveValue("");
 await expect(page.locator("#status")).toHaveValue("");
});

// CT22 - Cadastro de produto duplicado
test('CT22 - Cadastro de produto duplicado deve impedir mesmo nome', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche e salva um produto válido.
 await preencherProduto(page, 'Mouse sem fio', 'Eletrônicos', '59.90', '10', 'Mouse sem fio com conexão USB', 'Ativo');
 await salvarProduto(page);
 // Verifica se o primeiro cadastro foi aceito.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
 // Tenta cadastrar novamente outro produto com o mesmo nome.
 await preencherProduto(page, 'Mouse sem fio', 'Eletrônicos', '69.90', '5', 'Produto duplicado para teste', 'Ativo');
 await salvarProduto(page);
 // Verifica se o sistema impediu o cadastro duplicado.
 await expect(page.locator('#mensagem')).toHaveText('Já existe um produto cadastrado com este nome.');
});

// CT23 - Campo preço com vírgula
test('CT23 - Campo preço com vírgula deve aceitar valor ou exibir mensagem adequada', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário usando vírgula como separador decimal.
 await page.locator("#nomeProduto").fill('Teclado com fio');
 await page.locator("#categoria").selectOption('Eletrônicos');
 await page.locator("#preco").evaluate((campoPreco) => {
   campoPreco.value = '59,90';
   campoPreco.dispatchEvent(new Event('input', { bubbles: true }));
   campoPreco.dispatchEvent(new Event('change', { bubbles: true }));
 });
 await page.locator("#quantidade").fill('10');
 await page.locator("#descricao").fill('Teclado para teste');
 await page.locator("#status").selectOption('Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se o sistema aceitou o valor ou exibiu uma mensagem adequada sobre o preço.
 await expect(page.locator('#mensagem')).toHaveText(/Produto cadastrado com sucesso\.|O preço deve ser informado com ponto como separador decimal\.|O preço é obrigatório\./);
});

// CT24 - Campo quantidade com decimal
test('CT24 - Campo quantidade com decimal deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche a quantidade com valor decimal.
 await preencherProduto(page, 'Caderno universitário', 'Casa', '19.90', '10.5', 'Caderno para teste', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se o sistema impediu quantidade decimal.
 await expect(page.locator('#mensagem')).toHaveText('A quantidade em estoque deve ser um número inteiro.');
});

// CT25 - Produto inativo com estoque maior que zero
test('CT25 - Produto inativo com estoque maior que zero deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o produto como inativo, mas com estoque maior que zero.
 await preencherProduto(page, 'Produto inativo estoque', 'Casa', '29.90', '5', 'Produto inativo com estoque', 'Inativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se o sistema aplicou a regra de status e estoque.
 await expect(page.locator('#mensagem')).toHaveText('Produto inativo não pode ter estoque maior que zero.');
});
