import Fields from './Partials/Fields';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import React from 'react';
import Submit from '../../JsonApiForm/Submit';

export default function New() {
	return (
		<>
			<MetaTitle title="Add new event type" />

			<Form
				path="action-types"
				method="POST"
				relationshipNames={['options']}
				redirectOnSuccess={(response) => (`/event-types/${response.id}`)}
			>
				<Fields />
				<Submit />
			</Form>
		</>
	);
}
