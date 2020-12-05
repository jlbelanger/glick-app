import React, { useState } from 'react';
import FormContext from './FormContext';
import FormInner from './FormInner';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Form({
	afterSubmit,
	children,
	clearOnSubmit,
	defaultRow,
	hideFlash,
	id,
	filterBody,
	method,
	params,
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
				defaultRow={defaultRow}
				hideFlash={hideFlash}
				id={id}
				filterBody={filterBody}
				method={method}
				params={params}
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
	defaultRow: PropTypes.object,
	filterBody: PropTypes.func,
	hideFlash: PropTypes.bool,
	id: PropTypes.string,
	method: PropTypes.string.isRequired,
	params: PropTypes.string,
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
	defaultRow: {},
	filterBody: null,
	hideFlash: false,
	id: '',
	params: '',
	preventEmptyRequest: false,
	redirectOnSuccess: null,
	relationshipNames: [],
	row: {},
	successFlashMessage: '',
	successToastMessage: '',
	warnOnUnload: true,
};
