// https://docs.cypress.io/api/introduction/api.html

describe("Household", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user/loggedin", { fixture: "login.json" }).as("loggedin");
    cy.visit("/edit-household");
    cy.intercept("GET", "/household/*/users", { fixture: "users.json" }).as("users");
    cy.intercept("GET", "/user/*/households", { fixture: "households.json" }).as("households");
  });

  it("Superuser can delete household", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.intercept("/household/*", { statusCode: 200 }).as("delete");
    cy.url().should("include", "/edit-household");

    cy.contains("Slett Husholdning").click();
    cy.contains("button", "Ja").click();

    cy.wait("@delete");
    cy.contains("h2", "InvitedUser").should("be.visible");
    cy.contains("p", "Velg eller lag en ny husholdning").should("not.exist");
  });
  it("Superuser can invite user", () => {
    cy.intercept("user?email=*", { userId: 2 }).as("invite");
    cy.intercept("POST", "/household/*/users", { statusCode: 200 }).as("add");
    cy.intercept("GET", "/household/*/users", { fixture: "userAdded.json" }).as("newUser");
    cy.url().should("include", "/edit-household");
    cy.contains("Legg til bruker").click();
    cy.get("input").eq(1).type("test@test.com");
    cy.get(".dialog-footer").children("button").eq(1).click();
    cy.wait("@invite");
    cy.wait("@add");
    cy.wait("@newUser");
    cy.contains("h2", "newlyInvitedUser").should("be.visible");
  });
});
