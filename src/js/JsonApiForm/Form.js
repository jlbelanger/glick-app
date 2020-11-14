import React, { useState } from 'react';
import FormContext from './FormContext';
import FormInner from './FormInner';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Form({
	afterSubmit,
	children,
	clearOnSubmit,
	hideFlash,
	id,
	filterBody,
	method,
	path,
	preventEmptyRequest,
	redirectOnSuccess,
	relationshipNames,
	row,
	successFlashMessage,
	successToastMessage,
	warnOnUnload,
}) {
	const [formState, setFormState] = useState({
		dirty: [],
		errors: {},
		flash: '',
		row,
	});

	return (
		<FormContext.Provider value={{ formState, setFormState }}>
			<FormInner
				afterSubmit={afterSubmit}
				clearOnSubmit={clearOnSubmit}
				hideFlash={hideFlash}
				id={id}
				filterBody={filterBody}
				method={method}
				path={path}
				preventEmptyRequest={preventEmptyRequest}
				redirectOnSuccess={redirectOnSuccess}
				relationshipNames={relationshipNames}
				successFlashMessage={successFlashMessage}
				successToastMessage={successToastMessage}
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
	clearOnSubmit: PropTypes.bool,
	filterBody: PropTypes.func,
	hideFlash: PropTypes.bool,
	id: PropTypes.string,
	method: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	preventEmptyRequest: PropTypes.bool,
	redirectOnSuccess: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
	relationshipNames: PropTypes.array,
	row: PropTypes.object,
	successFlashMessage: PropTypes.string,
	successToastMessage: PropTypes.string,
	warnOnUnload: PropTypes.bool,
};

Form.defaultProps = {
	afterSubmit: () => {},
	clearOnSubmit: false,
	filterBody: null,
	hideFlash: false,
	id: '',
	preventEmptyRequest: false,
	redirectOnSuccess: null,
	relationshipNames: [],
	row: {},
	successFlashMessage: '',
	successToastMessage: '',
	warnOnUnload: true,
};