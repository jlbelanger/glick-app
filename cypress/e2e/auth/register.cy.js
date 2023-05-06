describe('register', () => {
	describe('with username that is taken', () => {
		it('shows an error', () => {
			cy.clearCookies();
			cy.visit('/register');
			cy.get('[name="username"]').type(Cypress.env('default_username'));
			cy.get('[name="email"]').type(`foo+${Date.now()}@example.com`);
			cy.get('[name="password"]').type(Cypress.env('default_password'));
			cy.get('[name="password_confirmation"]').type(Cypress.env('default_password'));
			cy.intercept('POST', '**/api/auth/register').as('register');
			cy.get('[type="submit"]').click();
			cy.wait('@register').its('response.statusCode').should('equal', 422);
			cy.get('#username-error').invoke('text').should('equal', 'The username has already been taken.');
		});
	});

	describe('with an email that is taken', () => {
		it('shows an error', () => {
			cy.clearCookies();
			cy.visit('/register');
			cy.get('[name="username"]').type(`foo+${Date.now()}`);
			cy.get('[name="email"]').type(Cypress.env('default_email'));
			cy.get('[name="password"]').type(Cypress.env('default_password'));
			cy.get('[name="password_confirmation"]').type(Cypress.env('default_password'));
			cy.intercept('POST', '**/api/auth/register').as('register');
			cy.get('[type="submit"]').click();
			cy.wait('@register').its('response.statusCode').should('equal', 422);
			cy.get('#email-error').invoke('text').should('equal', 'The email has already been taken.');
		});
	});

	describe('with mismatched passwords', () => {
		it('shows an error', () => {
			const username = `foo+${Date.now()}`;
			cy.clearCookies();
			cy.visit('/register');
			cy.get('[name="username"]').type(username);
			cy.get('[name="email"]').type(`${username}@example.com`);
			cy.get('[name="password"]').type('foo1');
			cy.get('[name="password_confirmation"]').type('foo2');
			cy.intercept('POST', '**/api/auth/register').as('register');
			cy.get('[type="submit"]').click();
			cy.wait('@register').its('response.statusCode').should('equal', 422);
			cy.get('#password-error').invoke('text').should('equal', 'The password confirmation does not match.');
		});
	});

	describe('with valid input', () => {
		it('works', () => {
			cy.intercept('DELETE', '**/api/users/*').as('deleteUser');

			// Register.
			const username = `foo+${Date.now()}`;
			cy.clearCookies();
			cy.visit('/register');
			cy.get('[name="username"]').type(username);
			cy.get('[name="email"]').type(`${username}@example.com`);
			cy.get('[name="password"]').type(Cypress.env('default_password'));
			cy.get('[name="password_confirmation"]').type(Cypress.env('default_password'));
			cy.intercept('POST', '**/api/auth/register').as('register');
			cy.get('[type="submit"]').click();
			cy.wait('@register').its('response.statusCode').should('equal', 200);
			cy.location('pathname').should('eq', '/event-types/new');

			// Delete.
			cy.visit('/profile');
			cy.get('.formosa-button--danger').contains('Delete').click();
			cy.get('dialog .formosa-button--danger').contains('Delete').click();
			cy.wait('@deleteUser').its('response.statusCode').should('equal', 204);
			cy.location('pathname').should('eq', '/');
		});
	});
});
