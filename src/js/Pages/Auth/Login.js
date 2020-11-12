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

	return (
		<>
			<MetaTitle title="Login" />

			<Form
				afterSubmit={afterSubmit}
				path="auth/login"
				method="POST"
				warnOnUnload={false}
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

				<Submit label="Log in" />

				<p style={{ textAlign: 'right' }}>
					<NavLink to="/forgot-password">Forgot your password?</NavLink>
				</p>
			</Form>
		</>
	);
}
