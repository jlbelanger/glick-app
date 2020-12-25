import Auth from '../../Auth/Auth';
import Fields from './Partials/Fields';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import React from 'react';
import Submit from '../../JsonApiForm/Submit';

export default function New() {
	const row = {
		user: {
			id: Auth.id(),
			type: 'users',
		},
	};

	return (
		<>
			<MetaTitle title="Add new event type" />

			<Form
				path="action-types"
				method="POST"
				relationshipNames={['user']}
				redirectOnSuccess={(response) => (`/event-types/${response.id}`)}
				row={row}
			>
				<Fields />
				<Submit />
			</Form>
		</>
	);
}
