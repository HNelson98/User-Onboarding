describe("Test ourour form ", function() {
    beforeEach(function(){
        cy.visit("http://localhost:3000/")
    })
    it("add test to inputs and submit form", function(){
        cy.get("input[name='name']").type('Henry Nelson').should('have.value', 'Henry Nelson');
    })
} )