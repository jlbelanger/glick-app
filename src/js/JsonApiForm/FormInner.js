import React, { useContext } from 'react';
import API from './Helpers/API';
import FormContext from './FormContext';
import Jsona from 'jsona';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function FormInner({
	afterSubmit,
	children,
	filterBody,
	id,
	method,
	path,
	relationshipNames,
	successMessage,
}) {
	const { formState, setFormState } = useContext(FormContext);
	const getBody = () => {
		let body = null;

		if (method === 'PUT' || method === 'POST') {
			let stuff = {};

			if (method === 'PUT') {
				stuff = {
					id,
					type: path,
					relationshipNames,
				};
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

		if (method === 'PUT') {
			if (formState.dirty.length <= 0) {
				toast('No changes to save.');
				return;
			}
		}

		const body = getBody();
		setFormState({
			...formState,
			errors: [],
		});

		API.request(method, url, body)
			.then((response) => {
				let message = successMessage;
				if (!message) {
					message = 'Saved successfully.';
					if (method === 'POST') {
						message = 'Added successfully.';
					} else if (method === 'DELETE') {
						message = 'Deleted successfully.';
					}
				}
				toast.success(message);
				setFormState({
					...formState,
					dirty: [],
				});
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
						if (!Object.prototype.hasOwnProperty.call(formState.row, key)) {
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
				});
			});
	};
	const hasErrors = Object.prototype.hasOwnProperty.call(formState.errors, '');

	return (
		<form onSubmit={onSubmit}>
			{hasErrors && (<p className="message message--error">{formState.errors[''].join(<br />)}</p>)}
			{children}
		</form>
	);
}

FormInner.propTypes = {
	afterSubmit: PropTypes.func.isRequired,
	filterBody: PropTypes.func,
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	method: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	relationshipNames: PropTypes.array.isRequired,
	successMessage: PropTypes.string.isRequired,
};

FormInner.defaultProps = {
	filterBody: null,
};
