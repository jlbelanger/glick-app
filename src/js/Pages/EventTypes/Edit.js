import {
	Api,
	Flash,
	Form,
	Submit,
} from '@jlbelanger/formosa';
import React, { useEffect, useState } from 'react';
import Error from '../../Error';
import Fields from './Partials/Fields';
import MetaTitle from '../../MetaTitle';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (row === null) {
			Api.get(`action-types/${id}?include=options`)
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
				relationshipNames={['options']}
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
				redirectOnSuccess="/event-types"
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
