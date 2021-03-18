import { Field, Form, Submit } from '@jlbelanger/formosa';
import Auth from '../../Utilities/Auth';
import MetaTitle from '../../MetaTitle';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Login() {
	const afterSubmit = (response) => {
		Auth.login(response.id, response.token, response.remember);
		window.location.reload();
	};

	return (
		<>
			<MetaTitle title="Login" hideTitleText />

			<Form
				afterSubmit={afterSubmit}
				path="auth/login"
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
					autoComplete="current-password"
					label="Password"
					name="password"
					required
					type="password"
				/>

				<Field
					label="Remember me"
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
