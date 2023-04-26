// https://docs.cypress.io/api/introduction/api.html

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should successfully log in and redirect to the home page", () => {
    cy.intercept("POST", "/user/login", { fixture: "login.json" }).as("login");
    cy.intercept("GET", `/user/*/households`, { fixture: "households.json" }).as("user");

    cy.get("#email-input").type("example@example.org");
    cy.get("#password-input").type("password123{enter}");

    cy.wait("@login");

    cy.url().should("include", "/");
  });
});
