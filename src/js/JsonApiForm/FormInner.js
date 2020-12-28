import React, { useContext } from 'react';
import API from './Helpers/API';
import Flash from './Flash';
import FormContext from './FormContext';
import Jsona from 'jsona';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function FormInner({
	afterSubmit,
	children,
	clearOnSubmit,
	defaultRow,
	filterBody,
	filterBodyBeforeSerialize,
	hideFlash,
	id,
	method,
	params,
	path,
	preventEmptyRequest,
	redirectOnSuccess,
	relationshipNames,
	style,
	successFlashMessage,
	successToastMessage,
}) {
	const { formState, setFormState } = useContext(FormContext);
	const history = useHistory();
	const getIncluded = (stuff) => {
		const included = [];
		stuff.relationshipNames.forEach((relationshipName) => {
			if (Object.prototype.hasOwnProperty.call(stuff, relationshipName)) {
				if (Array.isArray(stuff[relationshipName])) {
					stuff[relationshipName].forEach((rel) => {
						if (Object.keys(rel).length > 2) {
							// It has more than just the id/type keys.
							if (
								Object.prototype.hasOwnProperty.call(formState.dirtyIncluded, rel.type)
								&& Object.prototype.hasOwnProperty.call(formState.dirtyIncluded[rel.type], rel.id)
							) {
								const relStuff = {
									id: rel.id,
									type: rel.type,
								};
								formState.dirtyIncluded[rel.type][rel.id].forEach((key) => {
									relStuff[key] = rel[key];
								});
								included.push(new Jsona().serialize({ stuff: relStuff }).data);
							}
						}
					});
				}
			}
		});
		return included;
	};
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

			const included = getIncluded(stuff);
			if (filterBodyBeforeSerialize) {
				stuff = filterBodyBeforeSerialize(stuff);
			}
			body = new Jsona().serialize({ stuff });
			if (included.length > 0) {
				body.included = included;
			}
			if (filterBody) {
				body = filterBody(body);
			}
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
		if (params) {
			url += `?${params}`;
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

		API.request(method, url, body === null ? null : JSON.stringify(body))
			.then((response) => {
				if (!response) {
					return;
				}

				const newState = {
					...formState,
					dirty: [],
					dirtyIncluded: {},
					errors: {},
					flash: successFlashMessage,
				};
				if (clearOnSubmit) {
					newState.row = defaultRow;
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
				if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
					toast.error('Error.');
				} else {
					toast.error('Server error.');
					throw response;
				}

				const errors = {};
				let key;
				response.errors.forEach((error) => {
					if (Object.prototype.hasOwnProperty.call(error, 'source')) {
						key = error.source.pointer.replace('/data/attributes/', '');
						if (key.startsWith('/included/')) {
							const i = key.replace(/^\/included\/(\d+)\/.+$/g, '$1');
							const includedRecord = body.included[parseInt(i, 10)];
							key = key.replace(/^\/included\/(\d+)\//g, `included.${includedRecord.type}.${includedRecord.id}.`);
							key = key.replace(/\//g, '.');
						}
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

	return (
		<form onSubmit={onSubmit} style={style}>
			{!hideFlash && <Flash />}
			{children}
		</form>
	);
}

FormInner.propTypes = {
	afterSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	clearOnSubmit: PropTypes.bool,
	defaultRow: PropTypes.object.isRequired,
	filterBody: PropTypes.func,
	filterBodyBeforeSerialize: PropTypes.func,
	hideFlash: PropTypes.bool,
	id: PropTypes.string.isRequired,
	method: PropTypes.string.isRequired,
	params: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	preventEmptyRequest: PropTypes.bool,
	redirectOnSuccess: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
	relationshipNames: PropTypes.array.isRequired,
	style: PropTypes.object.isRequired,
	successFlashMessage: PropTypes.string.isRequired,
	successToastMessage: PropTypes.string.isRequired,
};

FormInner.defaultProps = {
	clearOnSubmit: false,
	filterBody: null,
	filterBodyBeforeSerialize: null,
	hideFlash: false,
	preventEmptyRequest: false,
	redirectOnSuccess: null,
};
