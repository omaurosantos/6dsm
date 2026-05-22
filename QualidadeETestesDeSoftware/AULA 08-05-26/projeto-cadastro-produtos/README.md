# Projeto Cadastro de Produtos

Este projeto foi criado para aula prática de Qualidade e Testes de Software.

## Arquivos

- `produtos.html`: tela de cadastro de produtos.
- `produtos.css`: estilos da tela.
- `produtos.js`: regras de validação do formulário.

## Como executar

1. Abra a pasta no VS Code.
2. Abra o arquivo `produtos.html`.
3. Clique com o botão direito e escolha `Open with Live Server`.
4. Acesse a tela pelo navegador.

## IDs usados para automação com Playwright

- `#nomeProduto`
- `#categoria`
- `#preco`
- `#quantidade`
- `#descricao`
- `#status`
- `#btnSalvar`
- `#mensagem`

## Regras implementadas

- Nome obrigatório.
- Nome mínimo de 3 caracteres.
- Nome máximo de 80 caracteres.
- Categoria obrigatória.
- Preço obrigatório.
- Preço maior que zero.
- Preço máximo de 9999.99.
- Quantidade obrigatória.
- Quantidade não pode ser negativa.
- Quantidade máxima de 999.
- Descrição máxima de 300 caracteres.
- Status obrigatório.
- Mensagem de sucesso para cadastro válido.

## Comando para rodar os testes
``` 
npx playwright test tests/all-tests.spec.js --headed
```

## Comando para rodas os testes do desafio extra
```
npx playwright test tests/desafio_extra.spec.js --headed
```

## Comando para visualizar o .html com reports
```
 npx playwright show-report
```