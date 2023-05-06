describe('profile', () => {
	beforeEach(() => {
		cy.login();
		cy.deleteAllData();
	});

	describe('when changing username', () => {
		describe('with taken username', () => {
			it('shows an error', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('[name="username"]').clear().type(Cypress.env('taken_username'));
				cy.intercept('PUT', '**/api/users/*').as('putUser');
				cy.get('button').contains('Change username').click();
				cy.wait('@putUser').its('response.statusCode').should('equal', 422);
				cy.get('#username-error').invoke('text').should('equal', 'The username has already been taken.');
				cy.reload();
				cy.get(`[name="username"][value="${Cypress.env('default_username')}"]`).should('exist');
			});
		});

		describe('with valid input', () => {
			it('works', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');

				// Change.
				const name = `${Cypress.env('default_username')}2`;
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('[name="username"]').clear().type(name);
				cy.intercept('PUT', '**/api/users/*').as('putUser');
				cy.get('button').contains('Change username').click();
				cy.wait('@putUser').its('response.statusCode').should('equal', 200);
				cy.contains('Username changed successfully.').should('exist');
				cy.get('.formosa-toast__close').click();
				cy.reload();
				cy.get(`[name="username"][value="${name}"]`).should('exist');

				// Change back.
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('[name="username"]').clear().type(Cypress.env('default_username'));
				cy.get('button').contains('Change username').click();
				cy.wait('@putUser').its('response.statusCode').should('equal', 200);
				cy.contains('Username changed successfully.').should('exist');
				cy.get('.formosa-toast__close').click();
				cy.reload();
				cy.get(`[name="username"][value="${Cypress.env('default_username')}"]`).should('exist');
			});
		});
	});

	describe('when changing email', () => {
		describe('with taken email', () => {
			it('shows an error', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('[name="email"]').clear().type(Cypress.env('taken_email'));
				cy.get('#current-password-email').clear().type(Cypress.env('default_password'));
				cy.intercept('PUT', '**/api/users/*/change-email').as('changeEmail');
				cy.get('button').contains('Change email').click();
				cy.wait('@changeEmail').its('response.statusCode').should('equal', 422);
				cy.get('#email-error').invoke('text').should('equal', 'The email has already been taken.');
				cy.reload();
				cy.get(`[name="email"][value="${Cypress.env('default_email')}"]`).should('exist');
			});
		});

		describe('with invalid current password', () => {
			it('shows an error', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');
				const email = `${Cypress.env('default_email')}2`;
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('[name="email"]').clear().type(email);
				cy.get('#current-password-email').clear().type('wrongpassword');
				cy.intercept('PUT', '**/api/users/*/change-email').as('changeEmail');
				cy.get('button').contains('Change email').click();
				cy.wait('@changeEmail').its('response.statusCode').should('equal', 422);
				cy.get('#current-password-email-error').invoke('text').should('equal', 'Current password is incorrect.');
				cy.reload();
				cy.get(`[name="email"][value="${Cypress.env('default_email')}"]`).should('exist');
			});
		});

		describe('with valid input', () => {
			it('works', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');

				// Change.
				const email = `${Cypress.env('default_email')}2`;
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('[name="email"]').clear().type(email);
				cy.get('#current-password-email').clear().type(Cypress.env('default_password'));
				cy.intercept('PUT', '**/api/users/*/change-email').as('changeEmail');
				cy.get('button').contains('Change email').click();
				cy.wait('@changeEmail').its('response.statusCode').should('equal', 204);
				cy.contains('Email changed successfully.').should('exist');
				cy.get('.formosa-toast__close').click();
				cy.reload();
				cy.get(`[name="email"][value="${email}"]`).should('exist');

				// Change back.
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('[name="email"]').clear().type(Cypress.env('default_email'));
				cy.get('#current-password-email').clear().type(Cypress.env('default_password'));
				cy.get('button').contains('Change email').click();
				cy.wait('@changeEmail').its('response.statusCode').should('equal', 204);
				cy.contains('Email changed successfully.').should('exist');
				cy.get('.formosa-toast__close').click();
				cy.reload();
				cy.get(`[name="email"][value="${Cypress.env('default_email')}"]`).should('exist');
			});
		});
	});

	describe('when changing password', () => {
		describe('with non-matching passwords', () => {
			it('shows an error', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');

				// Change.
				const password = `${Cypress.env('default_password')}2`;
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('#new_password').clear().type(password);
				cy.get('#new_password_confirmation').clear().type('somethingelse');
				cy.get('#current-password-password').clear().type(Cypress.env('default_password'));
				cy.intercept('PUT', '**/api/users/*/change-password').as('changePassword');
				cy.get('button').contains('Change password').click();
				cy.wait('@changePassword').its('response.statusCode').should('equal', 422);
				cy.get('#new_password-error').invoke('text').should('equal', 'The new password confirmation does not match.');
			});
		});

		describe('with invalid current password', () => {
			it('shows an error', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');

				// Change.
				const password = `${Cypress.env('default_password')}2`;
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('#new_password').clear().type(password);
				cy.get('#new_password_confirmation').clear().type(password);
				cy.get('#current-password-password').clear().type('wrongpassword');
				cy.intercept('PUT', '**/api/users/*/change-password').as('changePassword');
				cy.get('button').contains('Change password').click();
				cy.wait('@changePassword').its('response.statusCode').should('equal', 422);
				cy.get('#current-password-password-error').invoke('text').should('equal', 'Current password is incorrect.');
			});
		});

		describe('with valid input', () => {
			it('works', () => {
				cy.intercept('GET', '**/api/users/**').as('getUser');

				// Change.
				const password = `${Cypress.env('default_password')}2`;
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('#new_password').clear().type(password);
				cy.get('#new_password_confirmation').clear().type(password);
				cy.get('#current-password-password').clear().type(Cypress.env('default_password'));
				cy.intercept('PUT', '**/api/users/*/change-password').as('changePassword');
				cy.get('button').contains('Change password').click();
				cy.wait('@changePassword').its('response.statusCode').should('equal', 204);
				cy.contains('Password changed successfully.').should('exist');
				cy.get('.formosa-toast__close').click();

				// Change back.
				cy.visit('/profile');
				cy.wait('@getUser').its('response.statusCode').should('equal', 200);
				cy.get('#new_password').clear().type(Cypress.env('default_password'));
				cy.get('#new_password_confirmation').clear().type(Cypress.env('default_password'));
				cy.get('#current-password-password').clear().type(password);
				cy.get('button').contains('Change password').click();
				cy.wait('@changePassword').its('response.statusCode').should('equal', 204);
				cy.contains('Password changed successfully.').should('exist');
				cy.get('.formosa-toast__close').click();
			});
		});
	});

	describe('with demo user', () => {
		it('does not allow changing login info', () => {
			cy.intercept('GET', '**/api/users/*').as('getUser');
			cy.intercept('PUT', '**/api/users/*').as('putUser');
			cy.intercept('PUT', '**/api/users/*/change-email').as('changeEmail');
			cy.intercept('PUT', '**/api/users/*/change-password').as('changePassword');
			cy.intercept('DELETE', '**/api/auth/logout').as('logout');

			// Logout.
			cy.get('.nav__link').contains('Profile').click();
			cy.get('.nav__button').contains('Logout').click();
			cy.wait('@logout').its('response.statusCode').should('equal', 204);

			// Login.
			cy.login(Cypress.env('demo_username'), Cypress.env('demo_password'));

			// Go to profile.
			cy.visit('/profile');
			cy.wait('@getUser').its('response.statusCode').should('equal', 200);

			// Change username.
			cy.get('[name="username"]').clear().type('newdemousername');
			cy.get('button').contains('Change username').click();
			cy.wait('@putUser').its('response.statusCode').should('equal', 422);
			cy.get('.formosa-toast').contains('Error.').should('exist');
			cy.contains('The username cannot be changed.').should('exist');
			cy.reload();
			cy.get('[name="username"]').should('have.value', Cypress.env('demo_username'));

			// Change email.
			cy.get('[name="email"]').clear().type('newdemoemail@example.com');
			cy.get('#current-password-email').clear().type(Cypress.env('demo_password'));
			cy.get('button').contains('Change email').click();
			cy.wait('@changeEmail').its('response.statusCode').should('equal', 403);
			cy.get('.formosa-toast').contains('Error.').should('exist');
			cy.contains('You do not have permission to update this record.').should('exist');
			cy.reload();
			cy.get('[name="email"]').should('have.value', Cypress.env('demo_email'));

			// Change password.
			const password = 'newdemopassword';
			cy.get('#new_password').clear().type(password);
			cy.get('#new_password_confirmation').clear().type(password);
			cy.get('#current-password-password').clear().type(Cypress.env('demo_password'));
			cy.get('button').contains('Change password').click();
			cy.wait('@changePassword').its('response.statusCode').should('equal', 403);
			cy.get('.formosa-toast').contains('Error.').should('exist');
			cy.contains('You do not have permission to update this record.').should('exist');
		});
	});
});
