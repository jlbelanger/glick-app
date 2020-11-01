import React, { useEffect, useState } from 'react';
import API from '../Helpers/API';
import Field from '../Field';
import Form from '../Form';
import Submit from '../Submit';

export default function Profile() {
	const id = 2; // TODO
	const [row, setRow] = useState(null);
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

	return (
		<>
			<h2>Edit profile</h2>

			<Form action={`users/${row.id}`} method="PUT">
				<Field
					label="Username"
					name="username"
					row={row}
					setRow={setRow}
				/>

				<Field
					label="Email"
					name="email"
					row={row}
					setRow={setRow}
					type="email"
				/>

				<Submit />

				<h2>Change password</h2>

				<Field
					label="Current password"
					name="password"
					row={row}
					setRow={setRow}
					type="password"
				/>

				<Field
					label="New password"
					name="new_password"
					row={row}
					setRow={setRow}
					type="password"
				/>

				<Field
					label="Confirm new password"
					name="new_password_confirmation"
					row={row}
					setRow={setRow}
					type="password"
				/>

				<Submit />
			</Form>

			<h2>Delete account</h2>

			<Form action={`users/${row.id}`} method="DELETE">
				<Submit className="button--danger" label="Delete" />
			</Form>
		</>
	);
}
