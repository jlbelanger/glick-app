import {
	Api,
	Form,
	Message,
	Submit,
} from '@jlbelanger/formosa';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Error from '../../Error';
import Fields from './Partials/Fields';
import MetaTitle from '../../MetaTitle';
import MyForm from '../../MyForm';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	const history = useHistory();
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

			<Link className="table__link" to={`/event-types/${row.id}`}>&laquo; Back to events</Link>

			<MyForm
				id={id}
				method="PUT"
				path="action-types"
				preventEmptyRequest
				relationshipNames={['options']}
				row={row}
				setRow={setRow}
				successToastText="Event type saved successfully."
			>
				<Fields />
				<Submit />
			</MyForm>

			<Form
				afterSubmit={() => {
					history.push('/event-types');
				}}
				id={id}
				method="DELETE"
				path="action-types"
				showMessage={false}
				successToastText="Event type deleted successfully."
			>
				<h3>{`Delete ${row.label}`}</h3>

				<Message />

				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
