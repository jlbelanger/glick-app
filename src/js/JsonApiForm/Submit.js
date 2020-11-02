import PropTypes from 'prop-types';
import React from 'react';

export default function Submit({ className, label }) {
	return (
		<div className="field">
			<button className={`form__submit ${className}`} type="submit">{label}</button>
		</div>
	);
}

Submit.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
};

Submit.defaultProps = {
	className: '',
	label: 'Save',
};
