import Field from '../../JsonApiForm/Field';
import Form from '../../JsonApiForm/Form';
import MetaTitle from '../../MetaTitle';
import React from 'react';
import Submit from '../../JsonApiForm/Submit';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
	const { token } = useParams();

	return (
		<>
			<MetaTitle title="Reset your password" />

			<Form
				path={`auth/reset-password/${token}`}
				method="PUT"
				redirectOnSuccess="/"
				successToastMessage="Password reset successfully."
				warnOnUnload={false}
			>
				<Field
					autocomplete="email"
					label="Email"
					name="email"
					required
					type="email"
				/>

				<Field
					autocomplete="new-password"
					label="New password"
					name="new_password"
					required
					type="password"
				/>

				<Field
					autocomplete="new-password"
					label="Confirm new password"
					name="new_password_confirmation"
					required
					type="password"
				/>

				<Submit label="Reset password" />
			</Form>
		</>
	);
}
