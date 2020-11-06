import React from 'react';
import { ReactComponent as SpinnerIcon } from '../svg/spinner.svg';
import { usePromiseTracker } from 'react-promise-tracker';

const Spinner = () => {
	const { promiseInProgress } = usePromiseTracker();
	if (!promiseInProgress) {
		return null;
	}
	return (
		<div className="spinner">
			<SpinnerIcon />
		</div>
	);
};

export default Spinner;
