import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Auth from '../../Auth/Auth';
import Error from '../../Error';
import Field from '../../JsonApiForm/Field';
import Fields from './Fields';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import Submit from '../../JsonApiForm/Submit';

export default function Edit() {
	const id = Auth.id();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (row === null) {
			API.get(`users/${id}`)
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

	const afterDelete = () => {
		Auth.logout();
	};

	return (
		<>
			<MetaTitle title="Edit profile" />

			<Form
				path="users"
				id={row.id}
				method="PUT"
				preventEmptyRequest
				row={row}
				successToastMessage="Profile saved successfully."
			>
				<Fields />

				<Submit />
			</Form>

			<Form
				path="users"
				id={row.id}
				method="PUT"
				preventEmptyRequest
				successToastMessage="Password changed successfully."
			>
				<h3>Change password</h3>

				<Field
					autocomplete="current-password"
					label="Current password"
					name="password"
					required
					type="password"
				/>

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

				<Submit />
			</Form>

			<Form
				afterSubmit={afterDelete}
				path="users"
				id={row.id}
				method="DELETE"
				warnOnUnload={false}
			>
				<h3>Delete account</h3>

				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
