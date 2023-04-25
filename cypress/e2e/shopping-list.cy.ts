describe("Test registering and logging in", () => {
  it("visit shopping list", () => {
    cy.visit("/shopping-list");
    cy.once("uncaught:exception", () => false);
  });
});
