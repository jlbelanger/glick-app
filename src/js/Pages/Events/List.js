import React, { useEffect, useState } from 'react';
import { Api } from '@jlbelanger/formosa';
import Error from '../../Error';
import { getRowsByDate } from '../../Utilities/Datetime';
import { Link } from 'react-router-dom';
import MetaTitle from '../../MetaTitle';
import Row from './Partials/Row';

export default function List() {
	const [rows, setRows] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		Api.get('actions?include=action_type,option')
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
		return null;
	}

	const rowsByDate = getRowsByDate(rows);

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
					{Object.keys(rowsByDate).map((date) => (
						<Row key={date} date={date} rows={rowsByDate[date]} />
					))}
				</tbody>
			</table>
		</>
	);
}
