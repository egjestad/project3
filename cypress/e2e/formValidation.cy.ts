describe('Form Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/contact')
  })

  it('Submit button should be disabled when form is invalid', () => {
    cy.get('#nameInput').type('Jane Doe')
    cy.get('#emailInput').type('falseemail.no')
    cy.get('#messageInput').type('Hello')
    cy.get('button#submit').should('be.disabled')
  })

  it('Submit button should be enabled when form is valid', () => {
    cy.get('#nameInput').type('Jane Doe')
    cy.get('#emailInput').type('valid@email.com')
    cy.get('#messageInput').type('Hello')
    cy.get('button#submit').should('be.enabled')
  })
})
