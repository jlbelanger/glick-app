import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Error from '../../Error';
import Fields from './Fields';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import Submit from '../../JsonApiForm/Submit';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
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

	const title = `Edit ${row.action_type.label}`;

	return (
		<>
			<MetaTitle title={title} />

			<h2>{title}</h2>

			<Form
				path="actions"
				id={id}
				method="PUT"
				preventEmptyRequest
				row={row}
				successToastMessage="Event saved successfully."
			>
				<Fields />
				<Submit />
			</Form>

			<h2>{`Delete ${row.action_type.label}`}</h2>

			<Form
				path="actions"
				id={id}
				method="DELETE"
				redirectOnSuccess="/events"
				successToastMessage="Event deleted successfully."
				warnOnUnload={false}
			>
				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
