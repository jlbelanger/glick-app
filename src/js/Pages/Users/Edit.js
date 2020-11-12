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

	const title = 'Edit profile';

	return (
		<>
			<MetaTitle title={title} />

			<h2>{title}</h2>

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

				<h2>Change password</h2>

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

			<h2>Delete account</h2>

			<Form
				afterSubmit={afterDelete}
				path="users"
				id={row.id}
				method="DELETE"
				warnOnUnload={false}
			>
				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
