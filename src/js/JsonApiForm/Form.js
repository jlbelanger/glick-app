import React, { useState } from 'react';
import FormContext from './FormContext';
import FormInner from './FormInner';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Form({
	afterSubmit,
	children,
	id,
	method,
	path,
	relationshipNames,
	row,
	warnOnUnload,
}) {
	const [formState, setFormState] = useState({
		dirty: [],
		errors: [],
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
			<Prompt when={warnOnUnload && formState.dirty.length > 0} message="You have unsaved changes. Are you sure you want to leave this page?" />
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
	warnOnUnload: PropTypes.bool,
};

Form.defaultProps = {
	afterSubmit: () => {},
	id: '',
	relationshipNames: [],
	row: {},
	warnOnUnload: true,
};
