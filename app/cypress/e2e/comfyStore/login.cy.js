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

  
  it('login Page',()=>{
    const email = 'kathryne.howell19@ethereal.email'
    const pswd = 'mCrmbDKwuHw7rBCaw6'
    cy.get('.auth-btn').contains('Login').click()
    cy.get('.form-label').contains('email').siblings('input').type(email)
    cy.get('.form-label').contains('password').siblings('input').type(pswd)
    
    cy.get('button[type="submit"]').contains('Login').click()

    cy.contains('Login').should('not.exist')
    cy.contains('Logout').should('exist')

    cy.get('.nav-links li').contains('Checkout')

  })
  


})