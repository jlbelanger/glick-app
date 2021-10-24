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
				filterBody={(body) => {
					if (body.included) {
						body.included = body.included.map((rel) => {
							if (!rel.attributes.action_type_id) {
								rel.attributes.action_type_id = 'temp-this-id';
							}
							return rel;
						});
					}
					return body;
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
