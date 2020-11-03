import Checkbox from './Input/Checkbox';
import Input from './Input';
import Password from './Input/Password';
import PropTypes from 'prop-types';
import Radio from './Input/Radio';
import React from 'react';

export default function Field({
	autoComplete,
	inputMode,
	label,
	name,
	note,
	options,
	pattern,
	required,
	suffix,
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
			autoComplete={autoComplete}
			inputMode={inputMode}
			name={name}
			options={options}
			pattern={pattern}
			required={required}
			suffix={suffix}
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
	autoComplete: PropTypes.string,
	inputMode: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	note: PropTypes.string,
	options: PropTypes.object,
	pattern: PropTypes.string,
	required: PropTypes.bool,
	suffix: PropTypes.string,
	type: PropTypes.string,
};

Field.defaultProps = {
	autoComplete: '',
	inputMode: '',
	label: '',
	note: '',
	options: {},
	pattern: '',
	required: false,
	suffix: '',
	type: 'text',
};
