describe("Protected routes", () => {
  beforeEach(() => {
    cy.session("authenticated-user", () => {
      // aquí va el login real — se ejecuta solo la primera vez
      cy.visit("https://www.saucedemo.com");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include", "/inventory.html");
    });
  });

  it("can access inventory page when authenticated", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get(".inventory_list").should("be.visible");
  });
});
