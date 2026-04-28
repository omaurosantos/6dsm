# Projeto Login Teste

Este projeto foi criado para uma aula prática da disciplina Qualidade e Testes de Software.

O objetivo é mostrar como testar uma tela de login de duas formas:

1. Teste manual.
2. Teste automatizado com Playwright.

## Dados corretos para login

Usuário: admin
Senha: 123456

## Estrutura do projeto

projeto-login-teste/

- index.html
- style.css
- script.js
- package.json
- playwright.config.js
- tests/login.spec.js

## Como abrir o projeto manualmente

1. Abra a pasta no VS Code.
2. Instale a extensão Live Server.
3. Clique com o botão direito no arquivo index.html.
4. Clique em Open with Live Server.
5. Acesse a tela de login.

Normalmente o endereço será:

http://127.0.0.1:5500/index.html

## Como instalar os testes automatizados

Abra o terminal dentro da pasta do projeto e execute:

npm install

Depois instale os navegadores do Playwright:

npx playwright install

## Como rodar os testes

Para rodar todos os testes:

npm test

Para rodar vendo o navegador abrir:

npm run test:headed

Para abrir o relatório visual:

npm run report

## Casos de teste automatizados

- CT01 - Login válido.
- CT02 - Usuário vazio.
- CT03 - Senha vazia.
- CT04 - Usuário incorreto.
- CT05 - Senha incorreta.
- CT06 - Usuário e senha vazios.
- CT07 - Usuário com espaços antes e depois.
- CT08 - Usuário em letras maiúsculas.
- CT09 - Campo senha deve ocultar caracteres.
- CT10 - Mensagem de erro deve usar classe visual correta.

## Sugestão para aula

Primeiro faça os testes manualmente com os alunos.
Depois mostre que os mesmos testes podem ser automatizados.
Por fim, altere uma mensagem no arquivo script.js e rode os testes novamente para mostrar um teste falhando.
