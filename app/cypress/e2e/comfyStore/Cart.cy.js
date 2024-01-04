// <reference types="cypress" />

describe('cart', () => {
  beforeEach('Visits the product page', () => {
    // Visit the home page at localhost:5173
    cy.visit('http://localhost:5173/products')
    // cy.screenshot('home')

    // Add assertions or additional commands if needed
    // For example, you might want to check if a specific element is present:
    // cy.get('h1').should('contain', 'Welcome to Your App')
  })

  it('grab a product', () => {
    cy.get('h5').contains('accent chair').parent().siblings().find('a').click()

    cy.get('span')
      .contains('Available:')
      .parent()
      .should('have.text', 'Available: In Stock')

    cy.get('span')
      .contains('Colors : ')
      .siblings()
      .find('.color-btn')
      .first()
      .click()

    cy.get('.amount').siblings().last().click()

    cy.get('a').contains('add to cart').click()

    cy.url().should('eq', 'http://localhost:5173/cart')

    cy.get('a').contains('Continue Shopping').click()
    cy.get('h5').contains('armchair').parent().siblings().find('a').click()

    cy.get('span')
      .contains('Available:')
      .parent()
      .should('have.text', 'Available: In Stock')

    cy.get('span')
      .contains('Colors : ')
      .siblings()
      .find('.color-btn')
      .first()
      .click()

    cy.get('a').contains('add to cart').click()

    cy.url().should('eq', 'http://localhost:5173/cart')

    cy.get('.hbQJBP').first().find('.amount').siblings().first().click()
    cy.get('.hbQJBP').last().find('.remove-btn').click()
  })
  it('clear Cart', () => {
    cy.get('h5').contains('armchair').parent().siblings().find('a').click()

    cy.get('span')
      .contains('Available:')
      .parent()
      .should('have.text', 'Available: In Stock')

    cy.get('span')
      .contains('Colors : ')
      .siblings()
      .find('.color-btn')
      .first()
      .click()

    cy.get('.amount').siblings().last().click()

    cy.get('a').contains('add to cart').click()

    cy.url().should('eq', 'http://localhost:5173/cart')

    cy.get('button').contains('Clear Cart').click()

    cy.get('.empty').should('exist')
    cy.get('h2').contains('Your Cart is Empty').should('exist')
  })
})
