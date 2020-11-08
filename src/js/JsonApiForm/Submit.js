import PropTypes from 'prop-types';
import React from 'react';

export default function Submit({ before, className, label }) {
	return (
		<div className="field field--submit">
			{before}
			<button className={`form__submit ${className}`} type="submit">{label}</button>
		</div>
	);
}

Submit.propTypes = {
	before: PropTypes.node,
	className: PropTypes.string,
	label: PropTypes.string,
};

Submit.defaultProps = {
	before: null,
	className: '',
	label: 'Save',
};
