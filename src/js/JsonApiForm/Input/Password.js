import React, { useState } from 'react';
import Input from '../Input';
import PropTypes from 'prop-types';

export default function Password({
	name,
	required,
}) {
	const [tempType, setTempType] = useState('password');

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
				required={required}
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
	required: PropTypes.bool,
};

Password.defaultProps = {
	required: false,
};
