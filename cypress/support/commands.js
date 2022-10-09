Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Régis')
    cy.get('#lastName').type('Nyland Bloemer')
    cy.get('#email').type('regis@teste.com')
    cy.get('#open-text-area').type('teste', {delay: 0})
    cy.contains('button', 'Enviar').click()
})