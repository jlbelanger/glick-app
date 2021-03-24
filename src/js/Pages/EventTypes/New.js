import Fields from './Partials/Fields';
import MetaTitle from '../../MetaTitle';
import MyForm from '../../MyForm';
import React from 'react';
import { Submit } from '@jlbelanger/formosa';
import { useHistory } from 'react-router-dom';

export default function New() {
	const history = useHistory();

	return (
		<>
			<MetaTitle title="Add new event type" />

			<MyForm
				afterSubmit={() => {
					history.push('/');
				}}
				path="action-types"
				method="POST"
				relationshipNames={['options']}
			>
				<Fields />
				<Submit />
			</MyForm>
		</>
	);
}
