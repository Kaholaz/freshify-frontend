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

  it("Checks that item is empty when you enter the site", () => {
    cy.get("#add-item-selection-input").should("be.empty");
  });

 it('Checks that you can change the quantity of an item', () => {
  
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  
  cy.get('#add-item-count-input').clear().type(randomNumber);

  
  cy.get('#add-item-count-input').should('have.value', randomNumber.toString());
});

  it("Checks that you can not type a character in the quantity input field", () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  
  
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    
  cy.get('#add-item-count-input').clear().type('randomCharacter');
 
  cy.get('#add-item-count-input').should('have.value', '');
  });


  it('Checks that the el-collapse is not collapsed', () => {
  
  cy.get('#items-collapse').should('not.have.class', 'is-collapsed');
  });
  
  it('Checks that the el-collapse is collapsed after clicking', () => {
  
    cy.get('#items-collapse').click();
    cy.get('#items-collapse').should('have.class', 'is-collapsed');
});

});
