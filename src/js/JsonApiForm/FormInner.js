import React, { useContext } from 'react';
import API from './Helpers/API';
import FormContext from './FormContext';
import Jsona from 'jsona';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function FormInner({
	afterSubmit,
	children,
	clearOnSubmit,
	filterBody,
	id,
	method,
	path,
	preventEmptyRequest,
	redirectOnSuccess,
	relationshipNames,
	successFlashMessage,
	successToastMessage,
}) {
	const { formState, setFormState } = useContext(FormContext);
	const history = useHistory();
	const getBody = () => {
		let body = null;

		if (method === 'PUT' || method === 'POST') {
			let stuff = {};

			if (method === 'PUT') {
				stuff = {
					type: path,
					relationshipNames,
				};
				if (id) {
					stuff.id = id;
				}
				formState.dirty.forEach((key) => {
					stuff[key] = formState.row[key];
				});
			} else {
				stuff = {
					type: path,
					relationshipNames,
					...formState.row,
				};
			}

			body = new Jsona().serialize({ stuff });
			if (filterBody) {
				body = filterBody(body);
			}
			body = JSON.stringify(body);
		}

		return body;
	};
	const onSubmit = (e) => {
		e.preventDefault();

		if (method === 'DELETE') {
			if (!window.confirm('Are you sure you want to delete this?')) {
				return;
			}
		}

		let url = path;
		if (id) {
			url = `${path}/${id}`;
		}

		if (preventEmptyRequest && formState.dirty.length <= 0) {
			toast('No changes to save.');
			return;
		}

		const body = getBody();
		setFormState({
			...formState,
			errors: {},
			flash: '',
		});

		API.request(method, url, body)
			.then((response) => {
				const newState = {
					...formState,
					dirty: [],
					errors: {},
					flash: successFlashMessage,
				};
				if (clearOnSubmit) {
					newState.row = {};
				}
				setFormState(newState);

				if (redirectOnSuccess) {
					let redirectPath = redirectOnSuccess;
					if (typeof redirectPath === 'function') {
						redirectPath = redirectOnSuccess(response);
					}
					history.push(redirectPath);
				}
				if (successToastMessage) {
					toast.success(successToastMessage);
				}
				afterSubmit(response);
			})
			.catch((response) => {
				if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
					throw response;
				}
				toast.error('Error.');
				const errors = {};
				let key;
				response.errors.forEach((error) => {
					if (Object.prototype.hasOwnProperty.call(error, 'source')) {
						key = error.source.pointer.replace('/data/attributes/', '');
						if (!document.querySelector(`[name="${key}"]`)) {
							key = '';
						}
					} else {
						key = '';
					}
					if (!Object.prototype.hasOwnProperty.call(errors, key)) {
						errors[key] = [];
					}
					errors[key].push(error.title);
				});
				setFormState({
					...formState,
					errors,
					flash: '',
				});
			});
	};
	const hasErrors = Object.prototype.hasOwnProperty.call(formState.errors, '');

	return (
		<form onSubmit={onSubmit}>
			{hasErrors && (<p className="message message--error">{formState.errors[''].join(' ')}</p>)}
			{formState.flash && (<p className="message message--success">{formState.flash}</p>)}
			{children}
		</form>
	);
}

FormInner.propTypes = {
	afterSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	clearOnSubmit: PropTypes.bool,
	filterBody: PropTypes.func,
	id: PropTypes.string.isRequired,
	method: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	preventEmptyRequest: PropTypes.bool,
	redirectOnSuccess: PropTypes.string,
	relationshipNames: PropTypes.array.isRequired,
	successFlashMessage: PropTypes.string.isRequired,
	successToastMessage: PropTypes.string.isRequired,
};

FormInner.defaultProps = {
	clearOnSubmit: false,
	filterBody: null,
	preventEmptyRequest: false,
	redirectOnSuccess: null,
};
