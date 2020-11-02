import React, { useContext } from 'react';
import API from './Helpers/API';
import FormContext from './FormContext';
import Jsona from 'jsona';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function FormInner({
	afterSubmit,
	children,
	id,
	method,
	path,
	relationshipNames,
}) {
	const { formState, setFormState } = useContext(FormContext);
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

		let body = null;
		if (method === 'PUT') {
			if (formState.dirty.length <= 0) {
				toast('No changes to save.');
				return;
			}
		}
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
			body = JSON.stringify(body);
		}

		API.request(method, url, body)
			.then((response) => {
				let message = 'Saved successfully.';
				if (method === 'POST') {
					message = 'Added successfully.';
				} else if (method === 'DELETE') {
					message = 'Deleted successfully.';
				}
				toast.success(message);
				setFormState({
					...formState,
					dirty: [],
				});
				afterSubmit(response);
			})
			.catch(() => {
				toast.error('Error.');
				// TODO: Show inline errors.
			});
	};

	return (
		<form onSubmit={onSubmit}>
			{children}
		</form>
	);
}

FormInner.propTypes = {
	afterSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	method: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	relationshipNames: PropTypes.array.isRequired,
};
