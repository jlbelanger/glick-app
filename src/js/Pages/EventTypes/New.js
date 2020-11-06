import Fields from './Fields';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
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
	const title = 'Add new event type';

	return (
		<>
			<MetaTitle title={title} />

			<h2>{title}</h2>

			<Form afterSubmit={afterSubmit} path="action-types" method="POST" relationshipNames={['user']} row={row}>
				<Fields />
				<Submit />
			</Form>
		</>
	);
}
