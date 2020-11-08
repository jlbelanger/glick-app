import React, { useEffect, useState } from 'react';
import API from '../JsonApiForm/Helpers/API';
import Auth from '../Auth/Auth';
import Error from '../Error';
import Field from '../Log/Field';
import Form from '../JsonApiForm/Form';
import Label from '../Log/Label';
import { Link } from 'react-router-dom';
import MetaTitle from '../MetaTitle';

export default function Home() {
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

	return (
		<>
			<MetaTitle />

			<ul className="list" id="list">
				{rows.map((row) => {
					const defaultRow = {
						action_type: {
							id: row.id,
							type: 'action_types',
						},
					};
					return (
						<li className="list__item" key={row.id}>
							<Form path="actions" method="POST" relationshipNames={['action_type']} row={defaultRow}>
								<Label actionType={row} />
								<Field actionType={row} />
							</Form>
						</li>
					);
				})}
			</ul>
		</>
	);
}
