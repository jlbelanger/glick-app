import Checkbox from './Input/Checkbox';
import Input from './Input';
import Password from './Input/Password';
import PropTypes from 'prop-types';
import Radio from './Input/Radio';
import React from 'react';

export default function Field({
	label,
	name,
	note,
	options,
	required,
	type,
}) {
	let Component = Input;
	if (type === 'password') {
		Component = Password;
	} else if (type === 'radio') {
		Component = Radio;
	} else if (type === 'checkbox') {
		Component = Checkbox;
	}
	const input = (
		<Component
			name={name}
			options={options}
			required={required}
			type={type}
		/>
	);

	if (type === 'hidden') {
		return input;
	}

	return (
		<div className="field">
			<label className={`field__label${required ? ' field__label--required' : ''}`} htmlFor={name}>{label}</label>
			{note && <small>{`(${note})`}</small>}
			<div className={`field__input-wrapper field__input-wrapper--${type}`}>
				{input}
			</div>
		</div>
	);
}

Field.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	note: PropTypes.string,
	options: PropTypes.object,
	required: PropTypes.bool,
	type: PropTypes.string,
};

Field.defaultProps = {
	label: '',
	note: '',
	options: {},
	required: false,
	type: 'text',
};
