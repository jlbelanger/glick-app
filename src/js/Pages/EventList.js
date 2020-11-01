import React, { useEffect, useState } from 'react';
import API from '../Helpers/API';
import { Link } from 'react-router-dom';

export default function EventList() {
	const [rows, setRows] = useState(null);
	useEffect(() => {
		if (rows === null) {
			API.get('actions')
				.then((response) => {
					setRows(response);
				});
		}
		return () => {};
	});

	if (rows === null) {
		return null;
	}

	if (rows.length <= 0) {
		return (
			<>
				<h2>Past events</h2>
				<p>No events found!</p>
			</>
		);
	}

	return (
		<>
			<h2>Past events</h2>
			<ul className="list">
				<li className="list__item">
					<Link className="list__link" to="/">+ Add New</Link>
				</li>
				{rows.map(row => (
					<li className="list__item" key={row.id}>
						<Link className="list__link" to={`/events/${row.id}`}>{row.label}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
