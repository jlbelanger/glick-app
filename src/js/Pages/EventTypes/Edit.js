import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../JsonApiForm/Helpers/API';
import Fields from './Fields';
import Form from '../../JsonApiForm/Form';
import Submit from '../../JsonApiForm/Submit';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const history = useHistory();
	useEffect(() => {
		if (row === null) {
			API.get(`action-types/${id}`)
				.then((response) => {
					setRow(response);
				});
		}
		return () => {};
	});

	if (row === null) {
		return null;
	}

	const afterSubmit = () => {
		history.push('/event-types');
	};

	return (
		<>
			<h2>{`Edit ${row.label}`}</h2>

			<Form path="action-types" id={id} method="PUT" row={row}>
				<Fields />
				<Submit />
			</Form>

			<h2>{`Delete ${row.label}`}</h2>

			<Form afterSubmit={afterSubmit} path="action-types" id={id} method="DELETE">
				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
