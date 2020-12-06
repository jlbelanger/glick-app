import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const Spinner = () => {
	const { promiseInProgress } = usePromiseTracker();
	if (!promiseInProgress) {
		return null;
	}
	return (
		<div className="spinner" />
	);
};

export default Spinner;
