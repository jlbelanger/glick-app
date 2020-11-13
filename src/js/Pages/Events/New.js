import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Auth from '../../Auth/Auth';
import Error from '../../Error';
import Form from '../../JsonApiForm/Form';
import { Link } from 'react-router-dom';
import MetaTitle from '../../MetaTitle';
import NewField from './Partials/NewField';
import NewLabel from './Partials/NewLabel';

export default function New() {
	const [rows, setRows] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (rows === null) {
			API.get(`action-types?filter[user_id][eq]=${Auth.id()}`)
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
		let date = new Date().toISOString();
		date = date.substr(0, 19).replace('T', ' ');

		// TODO: This could be end_date if the event is already in progress.
		body.data.attributes.start_date = date;

		return body;
	};

	return (
		<>
			<MetaTitle />

			<ul className="list" id="list">
				{rows.map((row) => {
					const defaultRow = {
						// TODO: If this is an in-progress event, value should be set.
						action_type: {
							id: row.id,
							type: 'action_types',
						},
					};
					const className = 'list__item';
					// if ('TODO') {
					// 	className += ' list__item--active';
					// }
					return (
						<li className={className} key={row.id}>
							<Form
								clearOnSubmit={row.field_type === 'number'}
								filterBody={filterBody}
								method="POST"
								path="actions"
								relationshipNames={['action_type']}
								row={defaultRow}
								successToastMessage="Event added successfully."
								warnOnUnload={false}
							>
								<NewLabel actionType={row} />
								<NewField actionType={row} />
							</Form>
						</li>
					);
				})}
			</ul>
		</>
	);
}
