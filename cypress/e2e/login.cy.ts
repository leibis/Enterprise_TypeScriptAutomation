describe("Login Test", () => {
  it("should Log in successfully with valid credentials", () => {
    cy.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it("should fail to log in with invalid credentials", () => {
    cy.intercept("POST", "**/login", { statusCode: 401 });
    cy.login("invalid_user", "invalid_password");
    cy.get("[data-test='error']").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
