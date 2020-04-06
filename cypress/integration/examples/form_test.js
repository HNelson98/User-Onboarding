describe("Test ourour form ", function() {
    beforeEach(function(){
        cy.visit("http://localhost:3000/")
    })
    it("add test to inputs and submit form", function(){
        cy.get("input[name='name']").type('Henry Nelson').should('have.value', 'Henry Nelson');
        cy.get("input[name='name']").type('Henry Nelson').should('have.value', 'Henry Nelson');
        cy.get("input[name='email']").type('henry@email.com').should('have.value', 'henry@email.com');
        cy.get("input[name='password']").type('123456').should('have.value', '123456');
        cy.get('[data-cy= terms]').check().should('be.checked');
        cy.get('[data-cy= submitButton]').click()
    })

    it("add test to check submit validation", function(){
        cy.get("input[name='name']").type('Henry Nelson').should('have.value', 'Henry Nelson');
        cy.get("input[name='email']").type('henry@email.com').should('have.value', 'henry@email.com');
        cy.get("input[name='password']").type('123456').should('have.value', '123456');
        cy.get('[data-cy= submitButton]').click()
    })
} )