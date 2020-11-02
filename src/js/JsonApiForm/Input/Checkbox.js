import React, { useContext } from 'react';
import { ReactComponent as CheckIcon } from '../../../svg/check.svg';
import FormContext from '../FormContext';
import Input from '../Input';
import PropTypes from 'prop-types';

export default function Checkbox({
	className,
	name,
	required,
}) {
	const { formState } = useContext(FormContext);
	return (
		<>
			<Input
				checked={!!formState.row[name]}
				className={className}
				id={name}
				name={name}
				required={required}
				type="checkbox"
			/>
			<CheckIcon className="field__check" />
		</>
	);
}

Checkbox.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
};

Checkbox.defaultProps = {
	className: '',
	required: false,
};
