import React, { useContext } from 'react';
import Field from '../../../JsonApiForm/Field';
import FormContext from '../../../JsonApiForm/FormContext';

export default function Fields() {
	const { formState } = useContext(FormContext);
	return (
		<>
			<Field
				autocomplete="username"
				label="Username"
				name="username"
				required
			/>

			<Field
				autocomplete="email"
				label="Email"
				name="email"
				required
				type="email"
			/>

			{formState.dirty.includes('email') && (
				<Field
					autocomplete="current-password"
					label="Current password"
					name="password"
					note="You must provide your current password to change your email."
					required
					type="password"
				/>
			)}
		</>
	);
}
