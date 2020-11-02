import React, { useState } from 'react';
import FormContext from './FormContext';
import FormInner from './FormInner';
import PropTypes from 'prop-types';

export default function Form({
	afterSubmit,
	children,
	id,
	method,
	path,
	relationshipNames,
	row,
}) {
	const [formState, setFormState] = useState({
		dirty: [],
		row,
	});

	return (
		<FormContext.Provider value={{ formState, setFormState }}>
			<FormInner
				afterSubmit={afterSubmit}
				id={id}
				method={method}
				path={path}
				relationshipNames={relationshipNames}
			>
				{children}
			</FormInner>
		</FormContext.Provider>
	);
}

Form.propTypes = {
	afterSubmit: PropTypes.func,
	children: PropTypes.node.isRequired,
	id: PropTypes.string,
	method: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	relationshipNames: PropTypes.array,
	row: PropTypes.object,
};

Form.defaultProps = {
	afterSubmit: () => {},
	id: '',
	relationshipNames: [],
	row: {},
};
