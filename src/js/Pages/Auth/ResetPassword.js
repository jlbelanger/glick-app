import { Field, Form, Submit } from '@jlbelanger/formosa';
import { useHistory, useParams } from 'react-router-dom';
import MetaTitle from '../../MetaTitle';
import React from 'react';

export default function ResetPassword() {
	const { token } = useParams();
	const history = useHistory();

	return (
		<>
			<MetaTitle title="Reset your password" />

			<Form
				afterSubmit={() => {
					history.push('/');
				}}
				path={`auth/reset-password/${token}`}
				method="PUT"
				successToastText="Password reset successfully."
			>
				<Field
					autoComplete="email"
					label="Email"
					name="email"
					required
					type="email"
				/>

				<Field
					autoComplete="new-password"
					label="New password"
					name="new_password"
					required
					type="password"
				/>

				<Field
					autoComplete="new-password"
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
