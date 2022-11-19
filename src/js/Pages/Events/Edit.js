import { Api, Form, Message, Submit } from '@jlbelanger/formosa';
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
		Api.get(`actions/${id}?include=action_type,option`)
			.then((response) => {
				setRow(response);
			})
			.catch((response) => {
				setError(response.status);
			});
	}, [id]);

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
				id={id}
				method="PUT"
				path="actions"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				successToastText="Event saved successfully."
			>
				<Fields />
				<Submit />
			</MyForm>

			<Form
				afterSubmit={() => {
					history.push('/events');
				}}
				beforeSubmit={() => (
					confirm('Are you sure you want to delete this event?') // eslint-disable-line no-restricted-globals
				)}
				id={id}
				method="DELETE"
				path="actions"
				showMessage={false}
				successToastText="Event deleted successfully."
			>
				<h2>{`Delete ${row.action_type.label}`}</h2>

				<Message />

				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
