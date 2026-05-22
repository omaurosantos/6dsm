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

// CT07 - Cadastro sem informar preço
test('CT07 - Cadastro sem informar preço deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o preço vazio.
 await preencherProduto(page, 'Alicate de unha', 'Beleza', '', '12', 'Alicate inox', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O preço é obrigatório.');
});

// CT08 - Preço no limite inválido (zero)
test('CT08 - Cadastro com preço zero deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o preço zero.
 await preencherProduto(page, 'Presilha colorida', 'Acessórios', '0', '50', 'Presilha para cabelo', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O preço deve ser maior que zero.');
});

// CT09 - Preço menor que zero
test('CT09 - Cadastro com preço menor que zero deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o preço menor que zero.
 await preencherProduto(page, 'Shampoo teste', 'Beleza', '-5.00', '10', 'Produto teste', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O preço deve ser maior que zero.');
});

// CT10 - Preço mínimo válido
test('CT10 - Cadastro com preço mínimo válido deve exibir mensagem de sucesso', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o preço no mínimo válido.
 await preencherProduto(page, 'Elástico de cabelo', 'Acessórios', '0.01', '100', 'Elástico simples', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
});

// CT11 - Preço no limite máximo permitido
test('CT11 - Cadastro com preço máximo permitido deve exibir mensagem de sucesso', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o preço no máximo permitido.
 await preencherProduto(page, 'Notebook Gamer', 'Eletrônicos', '9999.99', '2', 'Notebook de alto desempenho', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
});

// CT12 - Preço acima do limite máximo permitido
test('CT12 - Cadastro com preço acima do limite máximo permitido deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o preço acima do limite máximo permitido.
 await preencherProduto(page, 'Computador Premium', 'Eletrônicos', '10000.00', '1', 'Computador para teste', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O preço não pode ser maior que 9999.99.');
});

// CT13 - Cadastro sem informar estoque
test('CT13 - Cadastro sem informar estoque deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o estoque vazio.
 await preencherProduto(page, 'Carrinho de brinquedo', 'Brinquedos', '25.90', '', 'Brinquedo infantil', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('A quantidade em estoque é obrigatória.');
});

// CT14 - Cadastro com estoque negativo
test('CT14 - Cadastro com estoque negativo deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o estoque negativo.
 await preencherProduto(page, 'Copo de vidro', 'Casa', '12.50', '-1', 'Copo simples', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('A quantidade em estoque não pode ser negativa.');
});

// CT15 - Produto sem estoque, mas permitido.
test('CT15 - Cadastro sem estoque deve exibir mensagem de sucesso', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o estoque zerado.
 await preencherProduto(page, 'Taça de vidro', 'Casa', '19.90', '0', 'Produto cadastrado sem estoque', 'Inativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
});

// CT16 - Produto com estoque no limite máximo.
test('CT16 - Cadastro com estoque no limite máximo deve exibir mensagem de sucesso', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o estoque no limite máximo.
 await preencherProduto(page, 'Presilha coração', 'Acessórios', '4.99', '999', 'Presilha pequena', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
});

// CT17 - Produto com estoque acima do limite máximo.
test('CT17 - Cadastro com estoque acima do limite máximo deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando o estoque acima do limite máximo.
 await preencherProduto(page, 'Balança digital', 'Eletrônicos', '39.90', '1000', 'Balança portátil', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('A quantidade em estoque não pode ser maior que 999.');
});

// CT18 - Descrição acima do limite
test('CT18 - Cadastro com descrição acima do limite permitido deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando a descrição acima do limite permitido.
 await preencherProduto(page, 'Kit acessórios', 'Acessórios', '29.90', '10', 
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula, nisl at convallis feugiat, nunc justo tincidunt augue, sed tempor lorem purus non massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec non sem vitae justo. Nulla facilisi est. Ok',
  'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('A descrição deve ter no máximo 300 caracteres.');
});

// CT19 - Cadastro sem status
test('CT19 - Cadastro sem status deve exibir mensagem de erro', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando status nulo.
 await preencherProduto(page, 'Produto teste status', 'Casa', '10.00', '10', 
  'Produto de teste',
  '');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('O status do produto é obrigatório.');
});

// CT20 - Cadastro válido com descrição vazia
test('CT20 - Cadastro com descrição vazia deve exibir mensagem de sucesso', async ({ page }) => {
 // Abre a tela de cadastro.
 await abrirTelaCadastro(page);
 // Preenche o formulário deixando a descrição vazia.
 await preencherProduto(page, 'Touca de cetim', 'Beleza', '18.90', '30', '', 'Ativo');
 // Clica em salvar.
 await salvarProduto(page);
 // Verifica se a mensagem correta apareceu.
 await expect(page.locator('#mensagem')).toHaveText('Produto cadastrado com sucesso.');
});
