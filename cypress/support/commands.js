Cypress.Commands.add('deleteAllData', () => {
	cy.intercept('GET', '**/api/users/**').as('getUser');
	cy.intercept('POST', '**/api/users/delete-data').as('deleteData');

	cy.visit('/profile');
	cy.wait('@getUser').its('response.statusCode').should('equal', 200);
	cy.get('[value="events"]').check();
	cy.get('[value="event types"]').check();
	cy.get('.formosa-button--danger').contains('Delete selected data').click();
	cy.get('dialog .formosa-button--danger').contains('Delete').click();
	cy.wait('@deleteData').its('response.statusCode').should('equal', 204);
	cy.contains('Data deleted successfully.').should('exist');
	cy.get('.formosa-toast__close').click();
});
