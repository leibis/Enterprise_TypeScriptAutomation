describe("Accessibility tests", () => {
  it("should have not accessibility violations on Loading page", () => {
    cy.visit("https://www.saucedemo.com");
    cy.injectAxe();
    cy.checkA11y();
  });
});
