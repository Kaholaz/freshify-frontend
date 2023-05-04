// https://docs.cypress.io/api/introduction/api.html

describe("Shopping list", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user/loggedin", { fixture: "login.json" }).as("loggedin");
    cy.intercept("GET", "/household/*/shoppinglist", { body: [] }).as("shoppinglist");
    cy.intercept("GET", "/household/*/users", { fixture: "users.json" }).as("users");
    cy.intercept("GET", "/user/*/households", { fixture: "households.json" }).as("households");
    cy.visit("/shopping-list");
    cy.wait("@shoppinglist");
  });

  it("Heisanne hoppsann", () => {
    assert.isTrue(true);
  });
});
  