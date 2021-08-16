describe('event types', () => {
	before(() => {
		cy.login();
	});

	describe('add', () => {
		describe('with valid minimal button', () => {
			it('works', () => {
				// Add.
				const name = `Foo ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="button"]').check();
				cy.intercept('POST', '**/api/action-types').as('add');
				cy.get('[type="submit"]').click();
				cy.wait('@add').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Delete.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});

		describe('with valid minimal number', () => {
			it('works', () => {
				// Add.
				const name = `Foo ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="number"]').check();
				cy.intercept('POST', '**/api/action-types').as('add');
				cy.get('[type="submit"]').click();
				cy.wait('@add').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Delete.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});

		describe('with valid minimal text', () => {
			it('works', () => {
				// Add.
				const name = `Foo ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="text"]').check();
				cy.intercept('POST', '**/api/action-types').as('add');
				cy.get('[type="submit"]').click();
				cy.wait('@add').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Delete.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});
	});

	// TODO: Edit, additional fields.
});
