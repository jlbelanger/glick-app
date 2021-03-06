import {
	Api,
	Form,
	Message,
	Submit,
} from '@jlbelanger/formosa';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Error from '../../Error';
import Fields from './Partials/Fields';
import { getEventLabel } from '../../Utilities';
import MetaTitle from '../../MetaTitle';
import MyForm from '../../MyForm';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	const history = useHistory();
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

			<MyForm
				path="actions"
				id={id}
				method="PUT"
				preventEmptyRequest
				row={row}
				successToastText="Event saved successfully."
			>
				<Fields />
				<Submit />
			</MyForm>

			<Form
				afterSubmit={() => {
					history.push('/events');
				}}
				id={id}
				method="DELETE"
				path="actions"
				showMessage={false}
				successToastText="Event deleted successfully."
			>
				<h3>{`Delete ${row.action_type.label}`}</h3>

				<Message />

				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
