import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Field from '../../JsonApiForm/Field';
import Fields from './Fields';
import Form from '../../JsonApiForm/Form';
import Submit from '../../JsonApiForm/Submit';
import { useHistory } from 'react-router-dom';

export default function Edit() {
	const id = '1'; // TODO
	const [row, setRow] = useState(null);
	const history = useHistory();
	useEffect(() => {
		if (row === null) {
			API.get(`users/${id}`)
				.then((response) => {
					setRow(response);
				});
		}
		return () => {};
	});

	if (row === null) {
		return null;
	}

	const afterSubmit = () => {
		history.push('/');
	};

	return (
		<>
			<h2>Edit profile</h2>

			<Form path="users" id={row.id} method="PUT" row={row}>
				<Fields />

				<Submit />

				<h2>Change password</h2>

				<Field
					label="Current password"
					name="password"
					type="password"
				/>

				<Field
					label="New password"
					name="new_password"
					type="password"
				/>

				<Field
					label="Confirm new password"
					name="new_password_confirmation"
					type="password"
				/>

				<Submit />
			</Form>

			<h2>Delete account</h2>

			<Form afterSubmit={afterSubmit} path="users" id={row.id} method="DELETE">
				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
