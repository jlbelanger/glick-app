describe('event types', () => {
	before(() => {
		cy.login();
	});

	describe('add', () => {
		describe('with valid minimal button', () => {
			it('works', () => {
				cy.intercept('POST', '**/api/action-types').as('addActionType');

				// Add.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="button"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Delete.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});

		describe('with valid button with options', () => {
			it('works', () => {
				cy.intercept('POST', '**/api/action-types').as('addActionType');

				// Add.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="button"]').check();
				cy.get('[name="_new.options.label"').type('Foo');
				cy.get('.formosa-button--add').click();
				cy.get('[id="options.0.label"]').should('exist');
				cy.get('[name="_new.options.label"').type('Bar');
				cy.get('.formosa-button--add').click();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Delete.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});

		describe('with valid start/stop button', () => {
			it('works', () => {
				cy.intercept('POST', '**/api/action-types').as('addActionType');

				// Add.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="button"]').check();
				cy.get('[name="is_continuous"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Delete.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});

		describe('with valid start/stop button with options', () => {
			it('works', () => {
				cy.intercept('POST', '**/api/action-types').as('addActionType');

				// Add.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="button"]').check();
				cy.get('[name="is_continuous"]').check();
				cy.get('[name="_new.options.label"').type('Foo');
				cy.get('.formosa-button--add').click();
				cy.get('[id="options.0.label"]').should('exist');
				cy.get('[name="_new.options.label"').type('Bar');
				cy.get('.formosa-button--add').click();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
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
				cy.intercept('POST', '**/api/action-types').as('addActionType');

				// Add.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="number"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Delete.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});

		describe('with valid number with units', () => {
			it('works', () => {
				cy.intercept('POST', '**/api/action-types').as('addActionType');

				// Add.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="number"]').check();
				cy.get('[name="suffix"]').type('lbs');
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
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
				cy.intercept('POST', '**/api/action-types').as('addActionType');

				// Add.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="text"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
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

	// TODO: Edit.
});
