import Auth from '../../Auth/Auth';
import Field from '../../JsonApiForm/Field';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Submit from '../../JsonApiForm/Submit';

export default function Login() {
	const afterSubmit = (response) => {
		Auth.login(response.id, response.token);
		window.location.reload();
	};
	const filterBody = body => (
		{
			username: body.data.attributes.username,
			password: body.data.attributes.password,
			remember: body.data.attributes.remember,
		}
	);

	const title = 'Login';

	return (
		<>
			<MetaTitle title={title} />

			<h2>{title}</h2>

			<Form
				afterSubmit={afterSubmit}
				filterBody={filterBody}
				path="auth/login"
				method="POST"
				successMessage="Logged in successfully."
			>
				<Field
					autocomplete="username"
					label="Username"
					name="username"
					required
					type="text"
				/>

				<Field
					autocomplete="current-password"
					label="Password"
					name="password"
					required
					type="password"
				/>

				<Field
					label="Remember Me"
					name="remember"
					type="checkbox"
				/>

				<Submit before={(<NavLink exact to="/register">Register</NavLink>)} label="Log in" />
			</Form>
		</>
	);
}
