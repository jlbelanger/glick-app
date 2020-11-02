import PropTypes from 'prop-types';
import React from 'react';

export default function Error({ status }) {
	let message = 'Error loading data. Please try again later.';
	if (status === 404) {
		message = 'This record does not exist.';
	}
	return (
		<>
			<h2>Error</h2>
			<p>{message}</p>
		</>
	);
}

Error.propTypes = {
	status: PropTypes.number.isRequired,
};
