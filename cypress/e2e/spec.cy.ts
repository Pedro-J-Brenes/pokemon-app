describe('General', () => {
  it('Navigates to the detail page by clicking a pokemon', () => {
    cy.visit('/');
    cy.url().should('include', 'home');

    cy.get('ul li:first').click();

    cy.url().should('includes', 'details/');
  });
});
