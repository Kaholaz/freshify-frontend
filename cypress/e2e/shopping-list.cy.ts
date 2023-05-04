// https://docs.cypress.io/api/introduction/api.html

describe("Shopping list", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user/loggedin", { fixture: "login.json" }).as("loggedin");
    cy.intercept("GET", "/household/*/shoppinglist", { body: [] }).as("shoppinglist");
    cy.intercept("GET", "/household/*/users", { fixture: "users.json" }).as("users");
    cy.intercept("GET", "/user/*/households", { fixture: "households.json" }).as("households");
    cy.intercept("GET", "/itemtype*", { fixture: "itemtype.json" }).as("itemtype");

    cy.visit("/shopping-list");
    cy.wait("@shoppinglist");
  });

  it("Checks that item is empty when you enter the site", () => {
    cy.get("#add-item-selection-input").should("be.empty");
  });

  it("Checks that you can change the quantity of an item", () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    cy.get("#add-item-count-input").clear();
    cy.get("#add-item-count-input").type(randomNumber.toString());

    cy.get("#add-item-count-input").should("have.value", randomNumber.toString());
  });

  it("Checks that you can not type a character in the quantity input field", () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";

    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

    cy.get("#add-item-count-input").clear();
    cy.get("#add-item-count-input").type(randomCharacter);
    cy.get("#add-item-count-input").should("have.value", "");
  });

  it("Checks that the el-collapse is not collapsed", () => {
    cy.get("#items-collapse").should("not.have.class", "is-collapsed");
  });

  it("Test adding an item to the shopping list", () => {
    cy.intercept("POST", "/household/*/shoppinglist", { fixture: "add-item-to-shopping-list.json" }).as("add-to-shoppinglist");
    cy.get("#add-item-selection-input").clear();
    cy.get("#add-item-selection-input").type("a");  // Doesn't matter what we write. The response is mocked
    cy.wait("@itemtype");
    cy.get(".el-autocomplete-suggestion__list").children("li").first().click();  // Select the first item in the list (And)
    cy.get("#add-item-selection-input").should("have.value", "And");

    // Add 5 to shopping list
    cy.get("#add-item-count-input").clear();
    cy.get("#add-item-count-input").type("5");
    cy.get("#add-item-count-input").should("have.value", "5");

    cy.get("#add-item-button").click();
    cy.wait("@add-to-shoppinglist");

    cy.get("#shopping-list-added-items").contains("And");
  });
});
