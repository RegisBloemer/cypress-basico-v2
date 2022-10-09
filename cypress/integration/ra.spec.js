/// <reference types="Cypress" />

describe('Testes do Repositório:RA', function() {

    const email_test = 'email@example.com';
    const senha_test = '121313';


    beforeEach(() => {
        cy.request('https://app.rarepository.ufsc.br/pt/login')
    })

    it('Verificar falha no login', function() {
        cy.get('input[type = "email"]').type(email_test)
        cy.get('input[type = "password"]').type(senha_test)
        cy.get('button[type = "submit"]').click()

        cy.get('.swal2-popup swal2-modal swal2-show').should('be_visible', {delay:0.1})
    })
}) 