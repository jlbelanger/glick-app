import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Api } from '@jlbelanger/formosa';
import Error from '../../Error';
import { getRowsByDate } from '../../Utilities/Datetime';
import MetaTitle from '../../MetaTitle';
import Row from '../Events/Partials/Row';

export default function Edit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (row === null) {
			Api.get(`action-types/${id}?include=actions`)
				.then((response) => {
					setRow(response);
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

	if (row === null) {
		return null;
	}

	const rowsByDate = getRowsByDate(row.actions);

	const addActionTypeToActions = (actions) => (
		actions.map((action) => {
			action.action_type = row;
			return action;
		})
	);

	return (
		<>
			<MetaTitle title={row.label} />

			<table>
				<tbody>
					<tr>
						<td>
							<Link className="table__link" to={`/event-types/${row.id}/edit`}>Edit</Link>
						</td>
					</tr>
					{Object.keys(rowsByDate).map((date) => (
						<Row key={date} date={date} rows={addActionTypeToActions(rowsByDate[date])} />
					))}
				</tbody>
			</table>
		</>
	);
}
