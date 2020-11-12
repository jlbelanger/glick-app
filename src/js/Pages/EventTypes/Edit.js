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
			API.get(`action-types/${id}`)
				.then((response) => {
					setRow(response);
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

	const title = `Edit ${row.label}`;

	return (
		<>
			<MetaTitle title={title} />

			<h2>{title}</h2>

			<Form
				path="action-types"
				id={id}
				method="PUT"
				preventEmptyRequest
				row={row}
				successToastMessage="Event type saved successfully."
			>
				<Fields />
				<Submit />
			</Form>

			<h2>{`Delete ${row.label}`}</h2>

			<Form
				path="action-types"
				id={id}
				method="DELETE"
				warnOnUnload={false}
				redirectOnSuccess="/events-types"
				successToastMessage="Event type deleted successfully."
			>
				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
