describe("Testes página home", () => {

    const url_page = 'http://127.0.0.1:5500/SA/home.html'
    const url_page_cadastro = 'http://127.0.0.1:5500/SA/cadastro.html'

    beforeEach(() => {
        cy.visit(url_page);
    })

    // TESTES FUNCIONAIS (funcionalidades, requisitos e regras de negócio)

    // TESTE 1 --- CLICAR NO BOTÃO LOGIN/CADASTRO

    it("Deve navegar para a página de login ao clicar no botão Login/Cadastro", () => {
        cy.get(".btnCadastro").click();

        cy.visit(url_page_cadastro);
    });

    // TESTE 2 --- VERIFICAR ELEMENTOS DA NAVBAR
    it("Deve exibir todos os elementos da navbar", () => {
        cy.get(".navbar-brand").should("contain", "Connext");
        cy.get(".nav-link").should("contain", "Home");
        cy.get(".btnCadastro").should("contain", "Login / Cadastro");
    });

    // TESTE 3 --- VERIFICAR CONTEÚDO DA SEÇÃO HERO
    it("Deve exibir o conteúdo da seção hero", () => {
        cy.get(".hero h1").should("contain", "Bem-vindo ao Connext");
        cy.get(".hero p").should("contain", "Monitore, gerencie e visualize");
    });

    // TESTE 4 --- VERIFICAR FOOTER
    it("Deve exibir o footer com informações corretas", () => {
        cy.get("footer").should("contain", "© 2025 Connext");
        cy.get("footer").should("contain", "Todos os direitos reservados");
    });

});