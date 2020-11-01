import PropTypes from 'prop-types';
import React from 'react';

export default function Input({
	className,
	name,
	row,
	setRow,
	type,
}) {
	const onChange = (e) => {
		setRow({
			...row,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<input
			className={className}
			id={name}
			name={name}
			onChange={onChange}
			type={type}
			value={row[name]}
		/>
	);
}

Input.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	row: PropTypes.object.isRequired,
	setRow: PropTypes.func.isRequired,
	type: PropTypes.string,
};

Input.defaultProps = {
	className: '',
	type: 'text',
};
