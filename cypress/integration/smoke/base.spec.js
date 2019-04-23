context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('.type() - type into a DOM element', () => {
    cy.get('[data-testid=mybutton]')
      .click();

    cy.get('[data-testid=mylabel]')
      .should('contain', '1');


    cy.get('[data-testid=mybutton]')
      .should('have.class', 'blue');


    cy.get('[data-testid=mybutton]')
      .click();

    cy.get('[data-testid=mylabel]')
      .should('contain', '2');


    cy.get('[data-testid=mybutton]')
      .should('have.class', 'yellow');
  });
});
