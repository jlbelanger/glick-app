import React, { useState } from 'react';
import FormContext from './FormContext';
import FormInner from './FormInner';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Form({
	afterSubmit,
	children,
	id,
	filterBody,
	method,
	path,
	relationshipNames,
	row,
	successMessage,
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
				filterBody={filterBody}
				method={method}
				path={path}
				relationshipNames={relationshipNames}
				successMessage={successMessage}
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
	filterBody: PropTypes.func,
	id: PropTypes.string,
	method: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	relationshipNames: PropTypes.array,
	row: PropTypes.object,
	successMessage: PropTypes.string,
	warnOnUnload: PropTypes.bool,
};

Form.defaultProps = {
	afterSubmit: () => {},
	filterBody: null,
	id: '',
	relationshipNames: [],
	row: {},
	successMessage: '',
	warnOnUnload: true,
};
