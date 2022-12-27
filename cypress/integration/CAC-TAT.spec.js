/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', ()=> {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(()=> {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', ()=> {
        cy.title().should('be.equal',"Central de Atendimento ao Cliente TAT")
    })

    it('preenche os campos obrigatórios e envia o formulário', ()=> {
        
        const text = 'ESta mensagem é apenas para teste. ESta mensagem é apenas para teste. ESta mensagem é apenas para teste. ESta mensagem é apenas para teste.'

        cy.clock()

        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('regis@teste.com')
        cy.get('#open-text-area').type(text, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
        cy.clock()
        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('registeste.com')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('verificação númerica', ()=>{
        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('regis@teste.com')
        cy.get('#open-text-area').type('Esta mensagem é apenas para teste')
        cy.get('#phone').type('asjbadbauf').should('have.value', '')
        cy.get('button[type="submit"]').click()

    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{    
        cy.clock()
        cy.get('#firstName').type('Régis')
        cy.get('#lastName').type('Nyland Bloemer')
        cy.get('#email').type('regis@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
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

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => { 
        cy.get('input[type="radio"]').check('elogio').should('be.checked')        
        cy.get('input[type="radio"]').check('ajuda').should('be.checked')
        cy.get('input[type="radio"]').check('feedback').should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type = "checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', ()=> {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(($input)=>{
                expect($input[0].files[0].name).to.equal('example.json')
    
            })
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
        cy.get('a').invoke('removeAttr', 'target').click()
    })


})