import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Error from '../../Error';
import Fields from './Partials/Fields';
import Flash from '../../JsonApiForm/Flash';
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

	return (
		<>
			<MetaTitle title={`Edit ${row.label}`} />

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

			<Form
				hideFlash
				id={id}
				method="DELETE"
				path="action-types"
				redirectOnSuccess="/events-types"
				successToastMessage="Event type deleted successfully."
				warnOnUnload={false}
			>
				<h3>{`Delete ${row.label}`}</h3>

				<Flash />

				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}