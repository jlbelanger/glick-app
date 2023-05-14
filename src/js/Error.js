import Auth from './Utilities/Auth';
import MetaTitle from './MetaTitle';
import PropTypes from 'prop-types';
import React from 'react';

export default function Error({ error }) {
	if (error.status === 401) {
		Auth.logout();
		return null;
	}

	let message = 'Error loading data. Please try again later.';
	if (error.errors[0].title) {
		message = error.errors[0].title;
	}
	return (
		<>
			<MetaTitle title="Error" />
			<p>{message}</p>
		</>
	);
}

Error.propTypes = {
	error: PropTypes.object.isRequired,
};
