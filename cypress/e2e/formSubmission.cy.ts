describe('Form Submission', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/contact')
  })

  it('should show success message on successful form submission', () => {
    cy.intercept('POST', 'http://localhost:5001/messages', {
      statusCode: 201,
    }).as('submitForm')

    cy.get('#nameInput').type('Jane Doe')
    cy.get('#emailInput').type('valid@mail.com')
    cy.get('#messageInput').type('Hello')
    cy.get('button#submit').should('be.enabled').click()

    // Wait for the API request and verify payload
    cy.wait('@submitForm').its('request.body').should('deep.equal', {
      name: 'Jane Doe',
      email: 'valid@mail.com',
      message: 'Hello',
    })

    // Check for success message appearance
    cy.get('.form').contains('Success: Form submitted successfully!').should('be.visible')
  })

  it('should show error message on unsuccessful form submission', () => {
    cy.intercept('POST', 'http://localhost:5001/messages', {
      statusCode: 500,
    }).as('submitForm')

    cy.get('#nameInput').type('Jane Doe')
    cy.get('#emailInput').type('valid@mail.com')
    cy.get('#messageInput').type('Hello')
    cy.get('button#submit').should('be.enabled').click()
    cy.wait('@submitForm')

    // Check for error message appearance
    cy.get('.form').contains('Error: Could not reach the backend!').should('be.visible')
  })
})
