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
	row,
	setRow,
	type,
}) {
	let Component = Input;
	if (type === 'password') {
		Component = Password;
	} else if (type === 'radio') {
		Component = Radio;
	}

	return (
		<div className="field">
			<label className="field__label" htmlFor={name}>{label}</label>
			{note && <small>{`(${note})`}</small>}
			<div className="field__input-wrapper">
				<Component
					name={name}
					options={options}
					row={row}
					setRow={setRow}
					type={type}
				/>
			</div>
		</div>
	);
}

Field.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	note: PropTypes.string,
	options: PropTypes.object,
	row: PropTypes.object.isRequired,
	setRow: PropTypes.func.isRequired,
	type: PropTypes.string,
};

Field.defaultProps = {
	note: '',
	options: {},
	type: 'text',
};
