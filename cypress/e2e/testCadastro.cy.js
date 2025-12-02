describe("Testes página de cadastro", () => {

  const url_page = 'http://127.0.0.1:5500/SA/cadastro.html'
  const url_page_login = 'http://127.0.0.1:5500/SA/login.html'

  beforeEach(() => {
    cy.visit(url_page);
  })

  // TESTES FUNCIONAIS (funcionalidades, requisitos e regras de negócio)

  // TESTE 1 --- CAMPOS VAZIO

  it("Deve exibir erro ao tentar enviar com campos vazios", () => {
    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .should("have.class", "erro")
      .and("contain", "Erro: Por favor, preencha todos os campos.");
  });

  // TESTE 2 --- EMAIL VÁLIDO

  it("Deve exibir erro ao inserir email inválido", () => {
    cy.get("#nome").type("João");
    cy.get("#email").type("email-invalido");
    cy.get("#senha").type("12345678");
    cy.get("#confirmarSenha").type("12345678");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .and("have.class", "erro")
      .and("contain", 'Erro: Insira um e-mail válido.');
  });

  // TESTE 3 --- 8 DÍGITOS

  it("Deve exibir erro quando a senha tiver menos de 8 caracteres", () => {
    cy.get("#nome").type("Maria");
    cy.get("#email").type("maria@teste.com");
    cy.get("#senha").type("123");
    cy.get("#confirmarSenha").type("123");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .should("have.class", "erro")
      .and("contain", "Erro: A senha deve ter pelo menos 8 dígitos.");
  });

  // TESTE 4 --- LETRA MAIÚSCULA

  it("Deve exibir erro quando a senha não tiver letra maiúscula", () => {
    cy.get("#nome").type("Maria");
    cy.get("#email").type("maria@teste.com");
    cy.get("#senha").type("1234567a");
    cy.get("#confirmarSenha").type("1234567a");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .should("have.class", "erro")
      .and("contain", "Erro: A senha deve conter pelo menos uma letra maiúscula.");
  });

  // TESTE 5 --- LETRA MINÚSCULA

  it("Deve exibir erro quando a senha não tiver letra minúscula", () => {
    cy.get("#nome").type("Maria");
    cy.get("#email").type("maria@teste.com");
    cy.get("#senha").type("1234567A");
    cy.get("#confirmarSenha").type("1234567A");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .should("have.class", "erro")
      .and("contain", "Erro: A senha deve conter pelo menos uma letra minúscula.");
  });

  // TESTE 6 --- NÚMERO

  it("Deve exibir erro quando a senha não tiver um número", () => {
    cy.get("#nome").type("Maria");
    cy.get("#email").type("maria@teste.com");
    cy.get("#senha").type("Aaaaaaaa");
    cy.get("#confirmarSenha").type("Aaaaaaaa");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .should("have.class", "erro")
      .and("contain", "Erro: A senha deve conter pelo menos um número.");
  });

  // TESTE 7 --- CARACTERE ESPECIAL

  it("Deve exibir erro quando a senha não tiver um caractere especial", () => {
    cy.get("#nome").type("Maria");
    cy.get("#email").type("maria@teste.com");
    cy.get("#senha").type("Aaaaaaa1");
    cy.get("#confirmarSenha").type("Aaaaaaa1");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .should("have.class", "erro")
      .and("contain", "Erro: A senha deve conter pelo menos um caractere especial (!@#$%...).");
  });

  // TESTE 8 --- CADASTRO EFETUADO COM SUCESSO

  it("Deve exibir mensagem de cadastro efetuado com sucesso", () => {
    cy.get("#nome").type("João Silva");
    cy.get("#email").type("joao@email.com");
    cy.get("#senha").type("Senha123!");
    cy.get("#confirmarSenha").type("Senha123!");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem")
      .should("be.visible")
      .should("have.class", "sucesso-ativo")
      .and("contain", "Cadastro efetuado com sucesso!");
  });

  // TESTE 9 --- REDIRECIONAMENTO PARA PÁGINA DE LOGIN

  it("Deve exibir erro caso o redirecionamento para a página de login falhe", () => {
    cy.get("#redirecionamentoLogin")
      .should("be.visible")

    cy.get(".redirecionamento").click()

    cy.visit(url_page_login);
  })
});
