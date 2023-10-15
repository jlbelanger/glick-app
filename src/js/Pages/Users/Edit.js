import { Alert, Api, Field, FormAlert, Submit } from '@jlbelanger/formosa';
import React, { useEffect, useState } from 'react';
import Auth from '../../Utilities/Auth';
import Error from '../../Error';
import { errorMessageText } from '../../Utilities/Helpers';
import MetaTitle from '../../MetaTitle';
import Modal from '../../Modal';
import MyForm from '../../MyForm';
import UserDeleteData from '../../UserDeleteData';

export default function Edit() {
	const id = Auth.id();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	const [deleteError, setDeleteError] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const deleteRow = () => {
		setShowModal(false);
		Api.delete(`users/${row.id}`)
			.catch((response) => {
				setDeleteError(errorMessageText(response));
			})
			.then((response) => {
				if (!response) {
					return;
				}
				Auth.logout();
			});
	};

	useEffect(() => {
		Api.get(`users/${id}`)
			.catch((response) => {
				setError(response);
			})
			.then((response) => {
				if (!response) {
					return;
				}
				setRow(response);
			});
	}, [id]);

	if (error) {
		return (
			<Error error={error} />
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
				errorMessageText={errorMessageText}
				id={row.id}
				method="PUT"
				path="users"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				showMessage={false}
				successToastText="Username changed successfully."
			>
				<FormAlert />

				<Field
					autoComplete="username"
					label="Username"
					name="username"
					required
				/>

				<Submit label="Change username" />
			</MyForm>

			<MyForm
				errorMessageText={errorMessageText}
				method="PUT"
				path="auth/change-email"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				showMessage={false}
				successToastText="Email changed successfully."
			>
				<h2>Change email</h2>

				<FormAlert />

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
				errorMessageText={errorMessageText}
				clearOnSubmit
				method="PUT"
				path="auth/change-password"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				showMessage={false}
				successToastText="Password changed successfully."
			>
				<h2>Change password</h2>

				<FormAlert />

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

			{deleteError && (<Alert type="error">{deleteError}</Alert>)}

			<UserDeleteData setDeleteError={setDeleteError} user={row} />

			<p>
				<button
					className="formosa-button formosa-button--danger"
					onClick={(e) => {
						setDeleteError(false);
						setShowModal(e);
					}}
					type="button"
				>
					Delete account
				</button>
			</p>

			{showModal && (
				<Modal
					event={showModal}
					okButtonClass="formosa-button--danger"
					okButtonText="Delete"
					onClickOk={deleteRow}
					onClickCancel={() => { setShowModal(false); }}
					text="Are you sure you want to delete your account?"
				/>
			)}
		</>
	);
}
