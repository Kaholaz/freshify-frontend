// https://docs.cypress.io/api/introduction/api.html

describe("Register", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user/loggedin", { statusCode: 401 }).as("loggedin");
    cy.visit("/register");
  });

  it("should successfully registe and redirect to the inventory page", () => {
    cy.intercept("POST", "/user", { fixture: "login.json" }).as("register");
    cy.intercept("GET", `/user/*/households`, { fixture: "households.json" }).as("user");
    cy.intercept("GET", `/household/*/inventory`, { fixture: "inventory.json" }).as("user");
    cy.intercept("GET", `/household/*/users`, { fixture: "users.json" }).as("user");
    cy.intercept("POST", "/household", { fixture: "household.json" }).as("household");

    cy.get("#email-input").type("example@example.org");
    cy.get("#first-name-input").type("password123{enter}");
    cy.get("#password-input").type("password123{enter}");
    cy.get("#password-confirm-input").type("password123{enter}");
    cy.wait("@register");
    cy.get("#household-name-input").type("mo{enter}");
    cy.get("#accept-tos").click();
    cy.wait("@household");
    cy.url().should("include", "/inventory");
  });
});
