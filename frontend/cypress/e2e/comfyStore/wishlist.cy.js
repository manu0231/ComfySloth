// <reference types="cypress" />

describe('wishlist', () => {
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

    cy.get('a').contains('add to wishlist').click()

    cy.url().should('eq', 'http://localhost:5173/wishlist')

    cy.get('a').contains('Continue Shopping').click()

    cy.get('h5').contains('accent chair').parent().siblings().find('a').click()

    cy.get('button').contains('already in wishlist').should('exist')

    cy.get('a').contains('wishlist').click()
    cy.get('.gczTMC').last().find('.remove-btn').click()
  })

  // it('clear wishlist', () => {
  //   cy.get('h5').contains('accent chair').parent().siblings().find('a').click()

  //   cy.get('span')
  //     .contains('Available:')
  //     .parent()
  //     .should('have.text', 'Available: In Stock')

  //   cy.get('span')
  //     .contains('Colors : ')
  //     .siblings()
  //     .find('.color-btn')
  //     .first()
  //     .click()

  //   cy.get('.amount').siblings().last().click()

  //   cy.get('a').contains('add to wishlist').click()

  //   cy.url().should('eq', 'http://localhost:5173/wishlist')

  //   cy.get('a').contains('Continue Shopping').click()

  //   cy.get('h5').contains('accent chair').parent().siblings().find('a').click()

  //   cy.get('button').contains('already in wishlist').should('exist')

  //   cy.get('a').contains('wishlist').click()
  // })
})
