import React, { useState } from 'react';
import Input from '../Input';
import PropTypes from 'prop-types';

export default function Password({
	name,
	row,
	setRow,
	type,
}) {
	const [tempType, setTempType] = useState(type);

	const togglePassword = () => {
		if (tempType === 'password') {
			setTempType('text');
		} else {
			setTempType('password');
		}
	};

	return (
		<>
			<Input
				className="prefix"
				name={name}
				row={row}
				setRow={setRow}
				type={tempType}
			/>
			<button className="postfix button--secondary" onClick={togglePassword} type="button">
				{tempType === 'password' ? 'Show password' : 'Hide password'}
			</button>
		</>
	);
}

Password.propTypes = {
	name: PropTypes.string.isRequired,
	row: PropTypes.object.isRequired,
	setRow: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
};
