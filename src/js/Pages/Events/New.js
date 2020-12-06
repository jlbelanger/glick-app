import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Error from '../../Error';
import Form from '../../JsonApiForm/Form';
import { getCurrentDatetime } from '../../Datetime';
import { Link } from 'react-router-dom';
import MetaTitle from '../../MetaTitle';
import NewField from './Partials/NewField';
import NewLabel from './Partials/NewLabel';

export default function New() {
	const [rows, setRows] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (rows === null) {
			API.get('action-types')
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
			<Link className="list__link" to="/event-types/new">+ Add an event type to get started</Link>
		);
	}

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
		const newRows = [...rows];
		newRows.forEach((actionType, i) => {
			if (actionType.id === action.action_type.id) {
				if (action.end_date) {
					newRows[i].in_progress = null;
				} else {
					newRows[i].in_progress = action;
				}
			}
		});
		setRows(newRows);
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
						defaultRow.value = row.in_progress.value;
					}

					const hasStopOnly = row.in_progress && !row.options;
					return (
						<li className={className} key={row.id}>
							<Form
								afterSubmit={afterSubmit}
								clearOnSubmit={row.field_type === 'number' || !row.is_continuous}
								defaultRow={defaultRow}
								filterBody={hasStopOnly ? filterBodyStop : filterBody}
								method={hasStopOnly ? 'PUT' : 'POST'}
								id={hasStopOnly ? row.in_progress.id.toString() : ''}
								params="include=action_type"
								path="actions"
								relationshipNames={['action_type']}
								row={defaultRow}
								successToastMessage={hasStopOnly ? 'Event stopped successfully.' : 'Event added successfully.'}
								warnOnUnload={false}
							>
								<NewLabel actionType={row} />
								<NewField actionType={row} />
							</Form>
							{row.in_progress && row.options ? (
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
