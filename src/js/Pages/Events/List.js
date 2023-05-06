import React, { useEffect, useState } from 'react';
import { Api } from '@jlbelanger/formosa';
import Error from '../../Error';
import { getRowsByYmd } from '../../Utilities/Datetime';
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
		return (
			<MetaTitle title="Past events" />
		);
	}

	const rowsByYmd = getRowsByYmd(rows);

	return (
		<>
			<MetaTitle title="Past events">
				<Link to="/">+ Add New</Link>
			</MetaTitle>

			{rows.length > 0 ? (
				<table>
					<tbody>
						{Object.keys(rowsByYmd).map((ymd) => (
							<Row key={ymd} rows={rowsByYmd[ymd]} ymd={ymd} />
						))}
					</tbody>
				</table>
			) : (
				<p>No events found.</p>
			)}
		</>
	);
}
