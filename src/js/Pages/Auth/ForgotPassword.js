import Field from '../../JsonApiForm/Field';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import React from 'react';
import Submit from '../../JsonApiForm/Submit';

export default function ForgotPassword() {
	const title = 'Forgot your password?';

	return (
		<>
			<MetaTitle title={title} />

			<h2>{title}</h2>

			<Form
				clearOnSubmit
				path="auth/forgot-password"
				method="POST"
				successFlashMessage="If there is an account with this email address, you will receive a password reset email shortly."
				warnOnUnload={false}
			>
				<Field
					autocomplete="email"
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
