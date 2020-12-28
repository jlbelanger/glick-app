import Auth from '../../Utilities/Auth';
import Field from '../../JsonApiForm/Field';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import React from 'react';
import Submit from '../../JsonApiForm/Submit';

export default function Register() {
	const afterSubmit = (response) => {
		Auth.login(response.id, response.token);
		window.location.reload();
	};

	return (
		<>
			<MetaTitle title="Register" />

			<Form
				afterSubmit={afterSubmit}
				path="auth/register"
				method="POST"
			>
				<Field
					autocomplete="username"
					label="Username"
					name="username"
					required
					type="text"
				/>

				<Field
					autocomplete="email"
					label="Email"
					name="email"
					required
					type="email"
				/>

				<Field
					autocomplete="new-password"
					label="Password"
					name="password"
					required
					type="password"
				/>

				<Field
					autocomplete="new-password"
					label="Confirm password"
					name="password_confirmation"
					required
					type="password"
				/>

				<Submit label="Register" />
			</Form>
		</>
	);
}
