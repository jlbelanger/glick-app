import React, { useContext } from 'react';
import Checkbox from './Input/Checkbox';
import FormContext from './FormContext';
import Input from './Input';
import Label from './Label';
import Password from './Input/Password';
import PropTypes from 'prop-types';
import Radio from './Input/Radio';

export default function Field({
	afterChange,
	autoComplete,
	className,
	id,
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
	const { formState } = useContext(FormContext);
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
			afterChange={afterChange}
			autoComplete={autoComplete}
			className={className}
			id={id}
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

	const labelComponent = (
		<Label
			htmlFor={id || name}
			label={label}
			note={note}
			required={required}
			type={type}
		/>
	);
	const showLabelBefore = type !== 'checkbox';

	const hasError = Object.prototype.hasOwnProperty.call(formState.errors, name);

	return (
		<div className={`field${hasError ? ' field--has-error' : ''}`}>
			{label && showLabelBefore && labelComponent}
			<div className={`field__input-wrapper field__input-wrapper--${type}`}>
				{input}
				{label && !showLabelBefore && labelComponent}
			</div>
			{hasError && <div className="field__error">{formState.errors[name].join((<br />))}</div>}
		</div>
	);
}

Field.propTypes = {
	afterChange: PropTypes.func,
	autoComplete: PropTypes.string,
	className: PropTypes.string,
	id: PropTypes.string,
	inputMode: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	note: PropTypes.string,
	options: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	pattern: PropTypes.string,
	required: PropTypes.bool,
	suffix: PropTypes.string,
	type: PropTypes.string,
};

Field.defaultProps = {
	afterChange: null,
	autoComplete: '',
	className: '',
	id: null,
	inputMode: '',
	label: '',
	note: '',
	options: [],
	pattern: '',
	required: false,
	suffix: '',
	type: 'text',
};
