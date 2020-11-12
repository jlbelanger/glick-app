import React, { useEffect, useState } from 'react';
import API from '../../JsonApiForm/Helpers/API';
import Auth from '../../Auth/Auth';
import Error from '../../Error';
import { Link } from 'react-router-dom';
import MetaTitle from '../../MetaTitle';
import Row from './Row';

export default function List() {
	const [rows, setRows] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (rows === null) {
			API.get(`actions?include=action_type&filter[action_types.user_id][eq]=${Auth.id()}`)
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

	const rowsByDate = {};
	rows.forEach((row) => {
		const date = row.start_date.substring(0, 10);
		if (!Object.prototype.hasOwnProperty.call(rowsByDate, date)) {
			rowsByDate[date] = [];
		}
		rowsByDate[date].push(row);
	});

	return (
		<>
			<MetaTitle title="Past events" />

			<table>
				<tbody>
					<tr>
						<td>
							<Link className="table__link" to="/">+ Add New</Link>
						</td>
					</tr>
					{Object.keys(rowsByDate).map(date => (
						<Row key={date} date={date} rows={rowsByDate[date]} />
					))}
				</tbody>
			</table>
		</>
	);
}
