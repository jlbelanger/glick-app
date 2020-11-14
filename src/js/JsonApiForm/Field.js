import React, { useContext } from 'react';
import Checkbox from './Input/Checkbox';
import FormContext from './FormContext';
import Input from './Input';
import Label from './Label';
import Password from './Input/Password';
import PropTypes from 'prop-types';
import Radio from './Input/Radio';

export default function Field({
	after,
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
	wrapperClassName,
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
		<div className={`field ${wrapperClassName}${hasError ? ' field--has-error' : ''}`.trim()}>
			{label && showLabelBefore && labelComponent}
			<div className={`field__input-wrapper field__input-wrapper--${type}`}>
				{input}
				{label && !showLabelBefore && labelComponent}
			</div>
			{after}
			{hasError && <div className="field__error">{formState.errors[name].join((<br />))}</div>}
		</div>
	);
}

Field.propTypes = {
	after: PropTypes.node,
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
	wrapperClassName: PropTypes.string,
};

Field.defaultProps = {
	after: null,
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
	wrapperClassName: '',
};
