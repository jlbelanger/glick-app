import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../JsonApiForm/Helpers/API';
import Error from '../../Error';
import Fields from './Fields';
import Form from '../../JsonApiForm/Form';
import Submit from '../../JsonApiForm/Submit';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	const history = useHistory();
	useEffect(() => {
		if (row === null) {
			API.get(`actions/${id}?include=action_type`)
				.then((response) => {
					setRow({
						...response,
						start_date: response.start_date ? response.start_date.replace(' ', 'T') : null,
						end_date: response.end_date ? response.end_date.replace(' ', 'T') : null,
					});
				})
				.catch((response) => {
					setError(response.status);
				});
		}
		return () => {};
	});

	if (error) {
		return (
			<Error status={error} />
		);
	}

	if (row === null) {
		return null;
	}

	const afterSubmit = () => {
		history.push('/events');
	};

	return (
		<>
			<h2>{`Edit ${row.action_type.label}`}</h2>

			<Form path="actions" id={id} method="PUT" row={row}>
				<Fields />
				<Submit />
			</Form>

			<h2>{`Delete ${row.action_type.label}`}</h2>

			<Form afterSubmit={afterSubmit} path="actions" id={id} method="DELETE">
				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
