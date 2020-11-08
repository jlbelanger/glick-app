import PropTypes from 'prop-types';
import React from 'react';

export default function Label({
	label,
	name,
	note,
	required,
	type,
}) {
	let className = 'field__label';
	if (required) {
		className += ' field__label--required';
	}
	if (type === 'checkbox') {
		className += ' field__label--checkbox';
	}
	return (
		<>
			<label className={className} htmlFor={name}>{label}</label>
			{note && <small>{`(${note})`}</small>}
		</>
	);
}

Label.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	note: PropTypes.string,
	required: PropTypes.bool,
	type: PropTypes.string.isRequired,
};

Label.defaultProps = {
	label: '',
	note: '',
	required: false,
};
