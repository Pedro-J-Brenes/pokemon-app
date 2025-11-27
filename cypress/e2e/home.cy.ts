describe('Home page', () => {
  it('Navigates to the detail page by clicking a pokemon', () => {
    cy.visit('/');

    cy.url().should('include', 'home');

    cy.get('ul li:first').click();

    cy.url().should('includes', 'details/');
  });

  it('Cant find search', () => {
    cy.visit('/');
    cy.get('[data-cy="search-input"]').type('aaaabbbbcccc12341234');

    cy.contains('The list is empty');
  });

  it('search id 1', () => {
    cy.visit('/');
    cy.get('[data-cy="search-input"]').type('1');

    cy.get('ul li:first').click();

    cy.url().should('include', 'details/1');
  });
});
