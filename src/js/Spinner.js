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
			<SpinnerIcon className="spinner__svg" />
		</div>
	);
};

export default Spinner;
