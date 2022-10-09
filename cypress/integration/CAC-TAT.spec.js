/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal',"Central de Atendimento ao Cliente TAT")
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        const text = 'ESta mensagem é apenas para teste. ESta mensagem é apenas para teste. ESta mensagem é apenas para teste. ESta mensagem é apenas para teste.'

        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('regis@teste.com')
        cy.get('#open-text-area').type(text, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('registeste.com')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('verificação númerica', function(){
        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('regis@teste.com')
        cy.get('#open-text-area').type('Esta mensagem é apenas para teste')
        cy.get('#phone').type('asjbadbauf').should('have.value', '')
        cy.get('button[type="submit"]').click()

    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){    
        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('regis@teste.com')
        cy.get('#phone-checkbox')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Régis').should('have.value', 'Régis').clear().should('have.value', '')
        cy.get('#lastName').type('Nyland Bloemer').should('have.value', 'Nyland Bloemer').clear().should('have.value', '')
        cy.get('#email').type('regis@teste.com').should('have.value', 'regis@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('8994893899').should('have.value', '8994893899').clear().should('have.value', '')
        cy.get('#open-text-area').type('mensagem teste').should('have.value', 'mensagem teste').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

  })
  