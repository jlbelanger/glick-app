import React, { useEffect, useState } from 'react';
import { Api } from '@jlbelanger/formosa';
import Error from '../../Error';
import { Link } from 'react-router-dom';
import MetaTitle from '../../MetaTitle';

export default function List() {
	const [rows, setRows] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		Api.get('action-types')
			.then((response) => {
				setRows(response);
			})
			.catch((response) => {
				setError(response.status);
			});
	}, []);

	if (error) {
		return (
			<Error status={error} />
		);
	}

	if (rows === null) {
		return (
			<MetaTitle title="Event types" />
		);
	}

	return (
		<>
			<MetaTitle title="Event types">
				<Link to="/event-types/new">+ Add New</Link>
			</MetaTitle>

			<ul className="list">
				{rows.map((row) => (
					<li className="list__item" key={row.id}>
						<Link className="list__link" to={`/event-types/${row.id}`}>{row.label}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
