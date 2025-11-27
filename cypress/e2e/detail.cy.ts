describe('Detail page', () => {
  it('Navigates to the detail page by clicking a pokemon', () => {
    cy.visit('/details/1');

    cy.get('[data-cy="return-home-button"]').click();

    cy.url().should('includes', 'home');
  });
});
