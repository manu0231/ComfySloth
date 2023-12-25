// myFirstTest.spec.js

describe('comfyStore', () => {
  beforeEach('Visits the home page', () => {
    // Visit the home page at localhost:5173
    cy.visit('http://localhost:5173')
    // cy.screenshot('home')

    // Add assertions or additional commands if needed
    // For example, you might want to check if a specific element is present:
    // cy.get('h1').should('contain', 'Welcome to Your App')
  })

  /* The code block `it('Check Nav links', () => { ... })` is a test case that checks the behavior of the
navigation links on a website. */

  it('Check Nav links', () => {
    cy.get('.nav-links')
    cy.get('.nav-links li').should('have.length.at.least', 3)
  })

  /* The code block `it('visit aboutPage', () => { ... })` is a test case that checks the behavior of
visiting the "about" page on a website. */
  it('visit aboutPage', () => {
    cy.get('.nav-links')
    cy.get('.nav-links li').contains('about').click()

    cy.get('section').find('img').should('exist')
    cy.get('h2').should('have.text', 'Our story')
    cy.get('p').should('not.be.empty')
  })

  //code block for check product page
  it('Product Page', () => {
    cy.get('.nav-links')
    cy.get('.nav-links li').contains('products').click()

    cy.get('.btn-container button').as('displayToggle').should('have.length', 2)

    cy.get('@displayToggle').last().click()
    cy.get('div.products-container').should('not.exist')

    cy.get('@displayToggle').first().click()
    cy.get('div.products-container').should('exist')

    cy.get('form')
      .should('exist')
      .find('.form-control')
      .should('have.length', 6)
      .and('contain', 'Category')
      .and('contain', 'Company')
      .and('contain', 'Colors')
      .and('contain', 'price')
      .and('contain', 'Free Shipping')

    let productCount

    // Get the initial product count
    cy.get('article')
      .its('length')
      .then((count) => {
        // Assign the initial product count
        productCount = count

        // Log the initial product count
        cy.log(productCount)

        // Click on 'office'
        cy.get('form')
          .contains('Category')
          .siblings()
          .contains('office')
          .click()

        // Log the updated product count after the filter is applied
        cy.get('article')
          .its('length')
          .then((updatedCount) => {
            cy.log(updatedCount)

            // Check if the product count has changed
            cy.get('article').should('not.have.length', productCount)
          })
      })
  })
})
