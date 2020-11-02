import Fields from './Fields';
import Form from '../../JsonApiForm/Form';
import React from 'react';
import Submit from '../../JsonApiForm/Submit';
import { useHistory } from 'react-router-dom';

export default function New() {
	const history = useHistory();
	const row = {
		user: {
			id: '1', // TODO
			type: 'users',
		},
	};
	const afterSubmit = (response) => {
		history.push(`/event-types/${response.id}`);
	};

	return (
		<>
			<h2>Add new event type</h2>

			<Form afterSubmit={afterSubmit} path="action-types" method="POST" relationshipNames={['user']} row={row}>
				<Fields />
				<Submit />
			</Form>
		</>
	);
}
