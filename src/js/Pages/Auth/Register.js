import { Field, Submit } from '@jlbelanger/formosa';
import Auth from '../../Utilities/Auth';
import MetaTitle from '../../MetaTitle';
import MyForm from '../../MyForm';
import React from 'react';

export default function Register() {
	const afterSubmit = (response) => {
		Auth.login(response.id, response.token, response.remember);
		window.location.reload();
	};

	return (
		<>
			<MetaTitle title="Register" hideTitleText />

			<MyForm
				afterSubmit={afterSubmit}
				path="auth/register"
				method="POST"
			>
				<Field
					autoComplete="username"
					label="Username"
					name="username"
					required
					type="text"
				/>

				<Field
					autoComplete="email"
					label="Email"
					name="email"
					required
					type="email"
				/>

				<Field
					autoComplete="new-password"
					label="Password"
					name="password"
					required
					type="password"
				/>

				<Field
					autoComplete="new-password"
					label="Confirm password"
					name="password_confirmation"
					required
					type="password"
				/>

				<Submit label="Register" />
			</MyForm>
		</>
	);
}
