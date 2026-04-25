// Importa a função que ajuda a configurar o Playwright
const { defineConfig } = require('@playwright/test');

// Exporta as configurações usadas pelos testes automatizados
module.exports = defineConfig({

    // Pasta onde ficam os arquivos de teste
    testDir: './tests',

    // Tempo máximo para cada teste executar
    timeout: 30000,

    // Configuração usada por todos os testes
    use: {

        // Endereço base do projeto quando estiver aberto no Live Server
        baseURL: 'http://127.0.0.1:5500',

        // Grava screenshot apenas quando o teste falhar
        screenshot: 'only-on-failure',

        // Grava vídeo apenas quando o teste falhar
        video: 'retain-on-failure'
    },

    // Configuração do relatório HTML do Playwright
    reporter: 'html'
});
