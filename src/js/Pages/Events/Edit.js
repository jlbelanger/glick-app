import { Api, FormosaContext, Submit } from '@jlbelanger/formosa';
import { getLocalYmdmsFromYmdhmsz, getYmdhmszFromLocalYmdhms } from '../../Utilities/Datetime';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Error from '../../Error';
import Fields from './Partials/Fields';
import { getEventLabel } from '../../Utilities';
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
		Api.get(`actions/${id}?include=action_type,option`)
			.then((response) => {
				if (response.start_date) {
					response.start_date = getLocalYmdmsFromYmdhmsz(response.start_date);
				}
				if (response.end_date) {
					response.end_date = getLocalYmdmsFromYmdhmsz(response.end_date);
				}
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
		Api.delete(`actions/${id}`)
			.then(() => {
				addToast('Event deleted successfully.', 'success');
				history.push('/events');
			})
			.catch((response) => {
				const text = response.message ? response.message : response.errors.map((err) => (err.title)).join(' ');
				addToast(text, 'error', 10000);
			});
	};

	const filterValues = (values) => {
		if (values.start_date) {
			values.start_date = getYmdhmszFromLocalYmdhms(values.start_date);
		}
		if (values.end_date) {
			values.end_date = getYmdhmszFromLocalYmdhms(values.end_date);
		}
		return values;
	};

	return (
		<>
			<MetaTitle title={`Edit ${getEventLabel(row)}`} />

			<MyForm
				id={id}
				filterValues={filterValues}
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

			<h2>{`Delete ${row.action_type.label}`}</h2>
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
					text="Are you sure you want to delete this event?"
				/>
			)}
		</>
	);
}
