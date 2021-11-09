describe('events', () => {
	before(() => {
		cy.login();
	});

	describe('add', () => {
		describe('with valid minimal button', () => {
			it('works', () => {
				cy.intercept('POST', '**/api/action-types').as('addActionType');
				cy.intercept('POST', '**/api/actions?*').as('addAction');

				// Add event type.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="button"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Add event.
				cy.contains(name).parents('form').find('.formosa-radio__label').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');

				// Delete event.
				cy.visit('/events');
				cy.contains(name).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Delete event type.
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
				cy.intercept('POST', '**/api/actions?*').as('addAction');

				// Add event type.
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

				// Add event.
				cy.contains(name).parents('form').contains('Foo').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (Foo)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Add event.
				cy.visit('/');
				cy.contains(name).parents('form').contains('Bar').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (Bar)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Delete event type.
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
				cy.intercept('POST', '**/api/actions?*').as('addAction');
				cy.intercept('PUT', '**/api/actions/**').as('updateAction');

				// Add event type.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="button"]').check();
				cy.get('[name="is_continuous"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Start event.
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Start').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('exist');
				cy.contains(name).parents('.list__item').should('have.class', 'list__item--active');

				// Stop event.
				cy.contains(name).parents('form').contains('Stop').click();
				cy.wait('@updateAction').its('response.statusCode').should('equal', 200);
				cy.contains('Event stopped successfully.').should('exist');
				cy.contains(name).parents('.list__item').should('not.have.class', 'list__item--active');

				// Delete event.
				cy.visit('/events');
				cy.contains(name).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Start event.
				cy.visit('/');
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Start').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('exist');
				cy.contains(name).parents('.list__item').should('have.class', 'list__item--active');

				// Reload page.
				cy.reload();

				// Stop event.
				cy.contains(name).parents('.list__item').should('have.class', 'list__item--active');
				cy.contains(name).parents('form').contains('Stop').click();
				cy.wait('@updateAction').its('response.statusCode').should('equal', 200);
				cy.contains('Event stopped successfully.').should('exist');
				cy.contains(name).parents('.list__item').should('not.have.class', 'list__item--active');

				// Delete event.
				cy.visit('/events');
				cy.contains(name).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Delete event type.
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
				cy.intercept('POST', '**/api/actions?*').as('addAction');
				cy.intercept('PUT', '**/api/actions/**').as('updateAction');

				// Add event type.
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

				// Start event.
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Foo').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('exist');
				cy.contains(name).parents('form').contains('Foo').should('have.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('form').contains('Bar').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('.list__item').should('have.class', 'list__item--active');

				// Stop event.
				cy.visit('/');
				cy.contains(name).parents('form').contains('Stop').click();
				cy.wait('@updateAction').its('response.statusCode').should('equal', 200);
				cy.contains('Event stopped successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Foo').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('form').contains('Bar').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('.list__item').should('not.have.class', 'list__item--active');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (Foo)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Start event.
				cy.visit('/');
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Bar').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('exist');
				cy.contains(name).parents('form').contains('Foo').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('form').contains('Bar').should('have.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('.list__item').should('have.class', 'list__item--active');

				// Stop event.
				cy.visit('/');
				cy.contains(name).parents('form').contains('Stop').click();
				cy.wait('@updateAction').its('response.statusCode').should('equal', 200);
				cy.contains('Event stopped successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Foo').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('form').contains('Bar').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('.list__item').should('not.have.class', 'list__item--active');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (Bar)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Start event.
				cy.visit('/');
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Foo').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('exist');
				cy.contains(name).parents('form').contains('Foo').should('have.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('form').contains('Bar').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('.list__item').should('have.class', 'list__item--active');

				// Change event.
				cy.contains(name).parents('form').contains('Bar').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');

				// Stop event.
				cy.visit('/');
				cy.contains(name).parents('form').contains('Stop').click();
				cy.wait('@updateAction').its('response.statusCode').should('equal', 200);
				cy.contains('Event stopped successfully.').should('exist');
				cy.contains(name).parents('form').contains('Stop').should('not.exist');
				cy.contains(name).parents('form').contains('Foo').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('form').contains('Bar').should('have.not.class', 'formosa-radio__label--checked');
				cy.contains(name).parents('.list__item').should('not.have.class', 'list__item--active');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (Foo)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (Bar)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Delete event type.
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
				cy.intercept('POST', '**/api/actions?*').as('addAction');

				// Add event type.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="number"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Add event.
				cy.contains(name).parents('form').find('.formosa-field__input').type(123);
				cy.contains(name).parents('form').find('[type="submit"]').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (123)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Delete event type.
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
				cy.intercept('POST', '**/api/actions?*').as('addAction');

				// Add event type.
				const name = `Example ${Date.now()}`;
				cy.visit('/event-types/new');
				cy.get('[name="label"]').type(name);
				cy.get('[name="field_type"][value="text"]').check();
				cy.get('[type="submit"]').click();
				cy.wait('@addActionType').its('response.statusCode').should('equal', 201);
				cy.location('pathname').should('eq', '/');

				// Add event.
				cy.contains(name).parents('form').find('.formosa-field__input').type('Foo');
				cy.contains(name).parents('form').find('[type="submit"]').click();
				cy.wait('@addAction').its('response.statusCode').should('equal', 201);
				cy.contains('Event added successfully.').should('exist');

				// Delete event.
				cy.visit('/events');
				cy.contains(`${name} (Foo)`).click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/events');

				// Delete event type.
				cy.visit('/event-types');
				cy.contains(name).click();
				cy.contains('Edit').click();
				cy.get('.button--danger').click();
				cy.location('pathname').should('eq', '/event-types');
			});
		});
	});
});