import Auth from '../../Auth/Auth';
import Fields from './Fields';
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
	const title = 'Add new event type';

	return (
		<>
			<MetaTitle title={title} />

			<h2>{title}</h2>

			<Form
				path="action-types"
				method="POST"
				relationshipNames={['user']}
				redirectOnSuccess={response => (`/event-types/${response.id}`)}
				row={row}
			>
				<Fields />
				<Submit />
			</Form>
		</>
	);
}
