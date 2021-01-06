import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Error from '../../Error';
import Form from '../../JsonApiForm/Form';
import { getCurrentDatetime } from '../../Utilities/Datetime';
import MetaTitle from '../../MetaTitle';
import NewField from './Partials/NewField';
import NewLabel from './Partials/NewLabel';
import { Redirect } from 'react-router-dom';

export default function New() {
	const [rows, setRows] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (rows === null) {
			API.get('action-types?include=options')
				.then((response) => {
					setRows(response);
				})
				.catch((response) => {
					setError(response.status);
				});
		}
		return () => {};
	});

	if (error) {
		return (
			<Error status={error} />
		);
	}

	if (rows === null) {
		return null;
	}

	if (rows.length <= 0) {
		return (
			<Redirect to="/event-types/new" />
		);
	}

	const filterBodyBeforeSerialize = (body) => {
		// Convert JSON options strings to objects.
		if (body.option && body.option[0] === '{') {
			body.option = JSON.parse(body.option);
		}

		// Remove default Add/Start/Stop values.
		let actionType;
		if (Object.prototype.hasOwnProperty.call(body, 'action_type')) {
			actionType = rows.find((row) => row.id === body.action_type.id);
		} else {
			actionType = rows.find((row) => row.in_progress.id === body.id);
		}
		if (actionType && actionType.field_type === 'button' && actionType.options.length <= 0) {
			delete body.value;
		}

		return body;
	};
	const filterBody = (body) => {
		body.data.attributes.start_date = getCurrentDatetime();
		return body;
	};
	const filterBodyStop = (body) => {
		body.data.attributes.end_date = getCurrentDatetime();
		return body;
	};

	const afterSubmit = (action) => {
		if (!action.action_type.is_continuous) {
			return;
		}
		const newActionTypes = [...rows];
		newActionTypes.forEach((actionType, i) => {
			if (actionType.id === action.action_type.id) {
				if (action.end_date) {
					newActionTypes[i].in_progress = null;
				} else {
					newActionTypes[i].in_progress = action;
				}
			}
		});
		setRows(newActionTypes);
	};

	const sortedRows = rows.sort((a, b) => {
		if (a.in_progress && b.in_progress) {
			return 0;
		}
		if (a.in_progress) {
			return -1;
		}
		if (b.in_progress) {
			return 1;
		}
		return 0;
	});

	return (
		<>
			<MetaTitle />

			<ul className="list" id="list">
				{sortedRows.map((row) => {
					const defaultRow = {
						action_type: {
							id: row.id,
							type: 'action_types',
						},
					};

					let className = 'list__item';
					if (row.in_progress) {
						className += ' list__item--active';
						defaultRow.option = JSON.stringify(row.in_progress.option);
					}

					const hasStopOnly = row.in_progress && row.options.length <= 0;
					return (
						<li className={className} key={row.id}>
							<Form
								afterSubmit={afterSubmit}
								clearOnSubmit={row.field_type === 'number' || !row.is_continuous}
								defaultRow={defaultRow}
								filterBody={hasStopOnly ? filterBodyStop : filterBody}
								filterBodyBeforeSerialize={filterBodyBeforeSerialize}
								method={hasStopOnly ? 'PUT' : 'POST'}
								id={hasStopOnly ? row.in_progress.id.toString() : ''}
								params="include=action_type,option"
								path="actions"
								relationshipNames={['action_type', 'option']}
								row={defaultRow}
								successToastMessage={hasStopOnly ? 'Event stopped successfully.' : 'Event added successfully.'}
								warnOnUnload={false}
							>
								<NewLabel actionType={row} />
								<NewField actionType={row} />
							</Form>
							{row.in_progress && row.options.length > 0 ? (
								<Form
									afterSubmit={afterSubmit}
									filterBody={filterBodyStop}
									method="PUT"
									params="include=action_type"
									path="actions"
									id={row.in_progress.id.toString()}
									successToastMessage="Event stopped successfully."
									style={{ display: 'none' }}
									warnOnUnload={false}
								>
									<button id={`submit-${row.id}-stop`} type="submit">Stop</button>
								</Form>
							) : null}
						</li>
					);
				})}
			</ul>
		</>
	);
}
