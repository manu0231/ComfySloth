// <reference types="cypress" />

describe('login', () => {
  beforeEach('Visits the home page', () => {
    // Visit the home page at localhost:5173
    cy.visit('http://localhost:5173')
    // cy.screenshot('home')

    // Add assertions or additional commands if needed
    // For example, you might want to check if a specific element is present:
    // cy.get('h1').should('contain', 'Welcome to Your App')
  })

  it('register', () => {
    cy.get('.auth-btn').contains('Login').click()
    cy.get('.register-link').contains('Register').click()
  })
  


})