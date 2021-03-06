import { Field, Form, Submit } from '@jlbelanger/formosa';
import MetaTitle from '../../MetaTitle';
import React from 'react';

export default function ForgotPassword() {
	return (
		<>
			<MetaTitle title="Forgot your password?" />

			<Form
				clearOnSubmit
				path="auth/forgot-password"
				method="POST"
				successFlashMessage="If there is an account with this email address, you will receive a password reset email shortly."
				warnOnUnload={false}
			>
				<Field
					autoComplete="email"
					label="Email"
					name="email"
					required
					type="email"
				/>

				<Submit label="Send reset link" />
			</Form>
		</>
	);
}
