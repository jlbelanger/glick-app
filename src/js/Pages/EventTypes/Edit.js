import { Api, FormosaContext, Submit } from '@jlbelanger/formosa';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Error from '../../Error';
import Fields from './Partials/Fields';
import MetaTitle from '../../MetaTitle';
import Modal from '../../Modal';
import MyForm from '../../MyForm';

export default function Edit() {
	const { addToast } = useContext(FormosaContext);
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const history = useHistory();

	useEffect(() => {
		Api.get(`action-types/${id}?include=options`)
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
		return (
			<MetaTitle title="Edit" />
		);
	}

	const deleteRow = () => {
		setShowModal(false);
		Api.delete(`action-types/${id}`)
			.then(() => {
				addToast('Event type deleted successfully.', 'success');
				history.push('/event-types');
			})
			.catch((response) => {
				const text = response.message ? response.message : response.errors.map((err) => (err.title)).join(' ');
				addToast(text, 'error', 10000);
			});
	};

	return (
		<>
			<MetaTitle title={`Edit ${row.label}`}>
				<Link to={`/event-types/${row.id}`}>&laquo; Back to events</Link>
			</MetaTitle>

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

			<h2>{`Delete ${row.label}`}</h2>
			<button
				className="formosa-button formosa-button--danger button--small"
				onClick={(e) => { setShowModal(e); }}
				type="button"
			>
				Delete
			</button>
			{showModal && (
				<Modal
					event={showModal}
					okButtonClass="formosa-button--danger"
					okButtonText="Delete"
					onClickOk={deleteRow}
					onClickCancel={() => { setShowModal(false); }}
					text="Are you sure you want to delete this event type?"
				/>
			)}
		</>
	);
}
