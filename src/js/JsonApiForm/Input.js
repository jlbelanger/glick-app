import React, { useContext } from 'react';
import FormContext from './FormContext';
import PropTypes from 'prop-types';

export default function Input({
	className,
	name,
	required,
	type,
}) {
	const { formState, setFormState } = useContext(FormContext);
	const onChange = (e) => {
		const newDirty = [...formState.dirty];
		if (!newDirty.includes(e.target.name)) {
			newDirty.push(e.target.name);
		}
		setFormState({
			...formState,
			dirty: newDirty,
			row: {
				...formState.row,
				[e.target.name]: type === 'checkbox' ? e.target.checked : e.target.value,
			},
		});
	};

	let value = formState.row[name] || '';
	let checked = false;
	if (type === 'checkbox') {
		if (value) {
			checked = true;
		}
		value = 1;
	}

	return (
		<input
			checked={checked}
			className={className}
			id={name}
			name={name}
			onChange={onChange}
			required={required}
			type={type}
			value={value}
		/>
	);
}

Input.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	type: PropTypes.string,
};

Input.defaultProps = {
	className: '',
	required: false,
	type: 'text',
};
