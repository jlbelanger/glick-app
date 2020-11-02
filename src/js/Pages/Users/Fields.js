import Field from '../../JsonApiForm/Field';
import React from 'react';

export default function Fields() {
	return (
		<>
			<Field
				label="Username"
				name="username"
				required
			/>

			<Field
				label="Email"
				name="email"
				required
				type="email"
			/>
		</>
	);
}
