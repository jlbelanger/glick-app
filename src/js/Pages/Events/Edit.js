import {
	Api,
	Flash,
	Form,
	Submit,
} from '@jlbelanger/formosa';
import React, { useEffect, useState } from 'react';
import Error from '../../Error';
import Fields from './Partials/Fields';
import { getEventLabel } from '../../Utilities';
import MetaTitle from '../../MetaTitle';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (row === null) {
			Api.get(`actions/${id}?include=action_type,option`)
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
			<MetaTitle title={`Edit ${getEventLabel(row)}`} />

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

			<Form
				hideFlash
				id={id}
				method="DELETE"
				path="actions"
				redirectOnSuccess="/events"
				successToastMessage="Event deleted successfully."
				warnOnUnload={false}
			>
				<h3>{`Delete ${row.action_type.label}`}</h3>

				<Flash />

				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
