import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const Spinner = () => {
	const { promiseInProgress } = usePromiseTracker();
	return (promiseInProgress ? <div className="spinner">Loading...</div> : null);
};

export default Spinner;
