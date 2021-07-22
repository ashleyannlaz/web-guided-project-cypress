// write tests here
describe('Quotes app', () => {
    // here go our tests
    beforeEach(() => {
        //code we want running before our tests run
        cy.visit('http://localhost:1234')
    });

    const textInput = () => cy.get('input[name="text"]');
    const authorInput = () => cy.get('input[name="author"]');
    const submitBtn = () => cy.get('button[id="submitBtn"]');
    const cancelBtn = () => cy.get('button[id="cancelBtn"]');
    
    //here go our tests
    it('Sanity test to make sure tests work', () => {
        expect (1 + 2).to.equal(3);
        //expect is an assertion, there can be many per test
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({})//not strict ==
        expect({}).to.eql({}); //strict ===
    });
    it('Playing around selecting dom elements', () =>{
        // cy.get('input[name="text"]').should("exist");
        textInput().should("exist");
        cy.get('input[name="author"]').should("exist");
        // cy.get('button[id="submitBtn"]').should("exist");
        submitBtn().should("exist");
        // cy.get('button[id="cancelBtn"]').should("exist");
        cancelBtn().should("exist");
        cy.get('input[name="foobar"]').should("not.exist");
        cy.contains("Submit Quote");
        cy.contains(/submit quote/i); // not strict
    });

    it('can type in the inputs', () => {
        //grab the inputs
        //assert that they are empty
        //type in them
        // cy.get('input[name="text"]').should("have.value", "")
        // cy.get('input[name="text"]').type("Have fun learning React!")
        // Make it D.R.Y.
       textInput()
        .should("have.value", "")
        .type("Have fun learning React!")
        .should("have.value", "Have fun learning React!")
        authorInput()
        .should("have.value", "")
        .type("Rhiannon")
        .should("have.value", "Rhiannon")
    });

    it('Button disabled until both inputs are filled out', () => {
        // arrange sanity checks
        // act like typing or clicking
        // assert that action has the effect we expect

        //new syntax you will need for this test:
        // (a) "be.disabled"
        // (b) .clear()
        submitBtn().should("be.disabled")
        textInput().type("TEXT")
        submitBtn().should("be.disabled")
        textInput().clear()
        authorInput().type("AUTHOR")
        submitBtn().should("be.disabled")
        textInput().type("TEXT INPUT")
        submitBtn().should("not.be.disabled")
    });

    it('Can cancel quote', () => {
        textInput().type("TEXT")
        authorInput().type("TEXT")
        cancelBtn().click()
        textInput().should("have.value", "")
        authorInput().should("have.value", "")
    })

    it('Can submit quote', () => {
        cy.contains("Happy Days (Ashley)").should("not.exist");
        textInput().type("Happy Days")
        authorInput().type("Ashley")
        submitBtn().click()
        cy.contains("Happy Days (Ashley)")


    })
})