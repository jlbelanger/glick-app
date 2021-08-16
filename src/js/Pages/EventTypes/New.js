import React, { useState } from 'react';
import Fields from './Partials/Fields';
import MetaTitle from '../../MetaTitle';
import MyForm from '../../MyForm';
import { Submit } from '@jlbelanger/formosa';
import { useHistory } from 'react-router-dom';

export default function New() {
	const [row, setRow] = useState({});
	const history = useHistory();

	return (
		<>
			<MetaTitle title="Add new event type" />

			<MyForm
				afterSubmit={() => {
					history.push('/');
				}}
				method="POST"
				path="action-types"
				relationshipNames={['options']}
				row={row}
				setRow={setRow}
			>
				<Fields />
				<Submit />
			</MyForm>
		</>
	);
}
