# Relatório da Atividade Prática: Testes da Tela de Login

**Nome do aluno ou grupo:** Mauro do Prado Santos 
**Integrantes:** Mauro do Prado Santos
**Data:** 24/04/2026  
**Sistema testado:** Sistema de Login  
**Ferramenta de automação:** Playwright  
**Navegador usado:** Chromium  
**Comando executado:** `npx playwright test --headed`

## 1. Objetivo da atividade

O objetivo da atividade foi testar uma tela de login simples, primeiro a partir das regras de negócio e dos casos de teste manuais, e depois por meio de testes automatizados com Playwright.

A atividade permitiu verificar se a funcionalidade de login aceita somente as credenciais corretas, bloqueia entradas inválidas, apresenta mensagens claras ao usuário e mantém o campo de senha oculto.

## 2. Regras de negócio analisadas

1. O campo usuário é obrigatório.
2. O campo senha é obrigatório.
3. O login só deve ser permitido com usuário `admin` e senha `123456`.
4. Se o usuário estiver incorreto, o sistema deve bloquear o acesso.
5. Se a senha estiver incorreta, o sistema deve bloquear o acesso.
6. Se usuário e senha estiverem corretos, o sistema deve exibir mensagem de sucesso.
7. O campo senha deve ocultar os caracteres digitados.
8. As mensagens exibidas devem ser claras para o usuário.

## 3. Casos de teste manuais

| ID | Cenário | Usuário | Senha | Resultado esperado | Resultado obtido | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CT01 | Login válido | `admin` | `123456` | Login realizado com sucesso. | Login realizado com sucesso. | Aprovado |
| CT02 | Usuário vazio | vazio | `123456` | O campo usuário é obrigatório. | O campo usuário é obrigatório. | Aprovado |
| CT03 | Senha vazia | `admin` | vazio | O campo senha é obrigatório. | O campo senha é obrigatório. | Aprovado |
| CT04 | Usuário incorreto | `aluno` | `123456` | Usuário ou senha inválidos. | Usuário ou senha inválidos. | Aprovado |
| CT05 | Senha incorreta | `admin` | `000000` | Usuário ou senha inválidos. | Usuário ou senha inválidos. | Aprovado |
| CT06 | Usuário e senha vazios | vazio | vazio | O campo usuário é obrigatório. | O campo usuário é obrigatório. | Aprovado |
| CT07 | Usuário com espaços | `admin` com espaços antes/depois | `123456` | Login realizado com sucesso. | Login realizado com sucesso. | Aprovado |
| CT08 | Usuário em maiúsculo | `ADMIN` | `123456` | Usuário ou senha inválidos. | Usuário ou senha inválidos. | Aprovado |
| CT09 | Campo senha oculto | `admin` | `123456` | A senha deve ficar oculta no campo. | Campo configurado com `type="password"`. | Aprovado |

## 4. Resultado dos testes manuais

Todos os casos de teste manuais planejados foram aprovados. Os resultados obtidos ficaram iguais aos resultados esperados para os cenários de sucesso, campos obrigatórios, credenciais inválidas, tratamento de espaços no usuário, usuário em maiúsculo e ocultação da senha.

**Resumo manual:**

| Total | Aprovados | Reprovados | Bloqueados |
| ---: | ---: | ---: | ---: |
| 9 | 9 | 0 | 0 |

## 5. Defeitos encontrados

Não foram encontrados defeitos durante a execução dos testes registrados neste relatório.

Como não houve caso reprovado, não foi necessário abrir registro de defeito com ID, severidade, passos de reprodução e evidência específica de falha.

## 6. Passos realizados para instalar as dependências

1. A pasta do projeto `projeto-login-teste` foi aberta no editor.
2. As dependências do projeto foram instaladas com:

```bash
npm install
```

3. O navegador Chromium do Playwright foi instalado com:

```bash
npx playwright install chromium
```

4. Os testes automatizados foram executados em modo com navegador visível:

```bash
npx playwright test --headed
```

5. O relatório visual do Playwright ficou disponível em:

```text
./playwright-report/index.html
```

## 7. Resultado dos testes automatizados

A execução automatizada foi concluída com sucesso.

**Resumo da execução Playwright:**

| Métrica | Resultado |
| --- | --- |
| Data e hora da execução | 24/04/2026 21:49:44 -03 |
| Total de testes automatizados | 10 |
| Testes aprovados | 10 |
| Testes inesperados/reprovados | 0 |
| Testes instáveis | 0 |
| Testes ignorados | 0 |
| Duração total | 4,79 s |
| Status geral | Aprovado |

**Casos automatizados executados:**

| ID | Teste automatizado | Resultado | Duração |
| --- | --- | --- | ---: |
| CT01 | Deve realizar login com usuário e senha corretos | Aprovado | 548 ms |
| CT02 | Deve bloquear login com usuário vazio | Aprovado | 400 ms |
| CT03 | Deve bloquear login com senha vazia | Aprovado | 369 ms |
| CT04 | Deve bloquear login com usuário incorreto | Aprovado | 356 ms |
| CT05 | Deve bloquear login com senha incorreta | Aprovado | 378 ms |
| CT06 | Deve validar primeiro o usuário quando os dois campos estiverem vazios | Aprovado | 362 ms |
| CT07 | Deve permitir login com espaços antes e depois do usuário | Aprovado | 361 ms |
| CT08 | Deve bloquear usuário em letras maiúsculas | Aprovado | 335 ms |
| CT09 | Campo senha deve ocultar os caracteres digitados | Aprovado | 318 ms |
| CT10 | Mensagem de erro deve usar a classe erro | Aprovado | 381 ms |

## 8. Evidências

As evidências da execução estão nos arquivos gerados pelo Playwright:

| Evidência | Caminho | Observação |
| --- | --- | --- |
| Relatório HTML do Playwright | `./playwright-report/index.html` | Contém o relatório visual com os 10 testes aprovados. |
| Última execução do Playwright | `./test-results/.last-run.json` | Registra `"status": "passed"` e `"failedTests": []`. |
| Arquivo de testes automatizados | `./tests/login.spec.js` | Contém os casos CT01 a CT10 executados pelo Playwright. |
| Configuração do Playwright | `./playwright.config.js` | Define `baseURL`, timeout, evidências em falha e relatório HTML. |

Conteúdo confirmado em `./test-results/.last-run.json`:

```json
{
  "status": "passed",
  "failedTests": []
}
```

## 9. Conclusão

A tela de login atendeu às regras de negócio analisadas. Os testes manuais foram aprovados e os testes automatizados confirmaram o mesmo comportamento esperado.

Com a atividade, foi possível praticar a criação de casos de teste, a comparação entre resultado esperado e resultado obtido, a interpretação do relatório do Playwright e o uso de evidências para documentar a qualidade da funcionalidade testada.
