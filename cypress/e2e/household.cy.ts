// https://docs.cypress.io/api/introduction/api.html

describe("Household", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user/loggedin", { fixture: "login.json" }).as("loggedin");
    cy.visit("/edit-household");
    cy.intercept("GET", "/household/*/users", { fixture: "users.json" }).as("users");
    cy.intercept("GET", "/user/*/households", { fixture: "households.json" }).as("households");
  });

  it("Superuser can demote user", () => {
    cy.url().should("include", "/edit-household");
    cy.contains("Degrader bruker").click();
    cy.intercept("PUT", "/household/*/users", { statusCode: 200 })
    cy.intercept("PUT", "/household/*/users", { statusCode: 200 })
    cy.intercept("PUT", "/household/*/users", { fixture: "demote.json" }).as("demote");
    cy.intercept("PUT", "/household/*/users", { fixture: "demote.json" }).as("demote");
    cy.contains('button', 'Promoter bruker').should('be.enabled');
    cy.contains('button', 'Degrader bruker').should('not.exist');
  });
});
