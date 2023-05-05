// https://docs.cypress.io/api/introduction/api.html

describe("Use item", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user/loggedin", { statusCode: 200, fixture: "login.json" }).as(
      "loggedin"
    );
    cy.intercept("GET", "/user/*/households", { fixture: "households.json", statusCode: 200 });
    cy.intercept("GET", "/household/*/users", { fixture: "users.json", statusCode: 200 });
    cy.intercept("GET", "/household/*/inventory", {
      fixture: "inventory.json",
      statusCode: 200,
    }).as("household");
    cy.visit("/inventory");
  });

  it("should successfully use item", () => {
    cy.intercept("PUT", "/household/*/inventory", {
      statusCode: 200,
    }).as("update-item");
    cy.get("#use-button").click();
    cy.get("#use").click();
    cy.get("#submit").click();
    cy.wait("@update-item");
  });

  it("should successfully delete item", () => {
    cy.intercept("DELETE", "household/*/inventory/*", {
      statusCode: 200,
    }).as("delete-item");
    cy.get("#delete-button").click();
    cy.wait("@delete-item");
  });
});
