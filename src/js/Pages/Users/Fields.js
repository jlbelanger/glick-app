import Field from '../../JsonApiForm/Field';
import React from 'react';

export default function Fields() {
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
		</>
	);
}
