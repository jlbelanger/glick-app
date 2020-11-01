import API from './Helpers/API';
import PropTypes from 'prop-types';
import React from 'react';

export default function Form({ action, children, method }) {
	const onSubmit = (e) => {
		e.preventDefault();
		API.request(method, action)
			.then(() => {
				// TODO: Show toast.
			});
	};

	return (
		<form onSubmit={onSubmit}>
			{children}
		</form>
	);
}

Form.propTypes = {
	action: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	method: PropTypes.string.isRequired,
};
