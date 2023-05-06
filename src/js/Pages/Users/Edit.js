import { Api, Field, FormosaContext, Message, Submit } from '@jlbelanger/formosa';
import React, { useContext, useEffect, useState } from 'react';
import Auth from '../../Utilities/Auth';
import Error from '../../Error';
import MetaTitle from '../../MetaTitle';
import Modal from '../../Modal';
import MyForm from '../../MyForm';
import UserDeleteData from '../../UserDeleteData';

export default function Edit() {
	const { addToast } = useContext(FormosaContext);
	const id = Auth.id();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const onClickDelete = () => {
		setShowModal(false);
		Api.delete(`users/${row.id}`)
			.then(() => {
				Auth.logout();
			})
			.catch((response) => {
				const text = response.message ? response.message : response.errors.map((err) => (err.title)).join(' ');
				addToast(text, 'error', 10000);
			});
	};

	useEffect(() => {
		Api.get(`users/${id}`)
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
			<MetaTitle title="Edit profile" />
		);
	}

	return (
		<>
			<MetaTitle title="Edit profile" />

			<MyForm
				id={row.id}
				method="PUT"
				path="users"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				showMessage={false}
				successToastText="Username changed successfully."
			>
				<Message />

				<Field
					autoComplete="username"
					label="Username"
					name="username"
					required
				/>

				<Submit label="Change username" />
			</MyForm>

			<MyForm
				method="PUT"
				path={`users/${row.id}/change-email`}
				preventEmptyRequest
				row={row}
				setRow={setRow}
				showMessage={false}
				successToastText="Email changed successfully."
			>
				<h2>Change email</h2>

				<Message />

				<Field
					autoComplete="email"
					label="Email"
					name="email"
					required
					type="email"
				/>

				<Field
					autoComplete="current-password"
					id="current-password-email"
					label="Current password"
					name="password"
					required
					type="password"
				/>

				<Submit label="Change email" />
			</MyForm>

			<MyForm
				clearOnSubmit
				method="PUT"
				path={`users/${row.id}/change-password`}
				preventEmptyRequest
				row={row}
				setRow={setRow}
				showMessage={false}
				successToastText="Password changed successfully."
			>
				<h2>Change password</h2>

				<Message />

				<Field
					autcomplete="new-password"
					label="New password"
					name="new_password"
					required
					type="password"
				/>

				<Field
					autcomplete="new-password"
					label="Confirm new password"
					name="new_password_confirmation"
					required
					type="password"
				/>

				<Field
					autoComplete="current-password"
					id="current-password-password"
					label="Current password"
					name="password"
					required
					type="password"
				/>

				<Submit label="Change password" />
			</MyForm>

			<h2>Delete data</h2>

			<UserDeleteData user={row} />

			<p>
				<button className="formosa-button formosa-button--danger" onClick={(e) => { setShowModal(e); }} type="button">
					Delete account
				</button>
			</p>

			{showModal && (
				<Modal
					event={showModal}
					okButtonClass="formosa-button--danger"
					okButtonText="Delete"
					onClickOk={onClickDelete}
					onClickCancel={() => { setShowModal(false); }}
					text="Are you sure you want to delete your account?"
				/>
			)}
		</>
	);
}
