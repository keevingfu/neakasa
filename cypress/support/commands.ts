/// <reference types="cypress" />

// Custom commands for Neakasa application

// Command to login (if authentication is implemented)
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/login');
});

// Command to wait for video grid to load
Cypress.Commands.add('waitForVideoGrid', () => {
  cy.get('[class*="grid"]').should('be.visible');
  cy.get('[class*="bg-white rounded-lg shadow-md"]').should('have.length.at.least', 1);
});

// Command to navigate to a specific section
Cypress.Commands.add('navigateToSection', (section: string) => {
  cy.get('[class*="sidebar"]').within(() => {
    cy.contains(section).click();
  });
});

// Declare custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      waitForVideoGrid(): Chainable<void>;
      navigateToSection(section: string): Chainable<void>;
    }
  }
}

export {};