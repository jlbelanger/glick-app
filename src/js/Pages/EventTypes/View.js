import 'chartjs-plugin-zoom';
import { Bar, Line } from 'react-chartjs-2';
import { barGraphData, lineGraphData } from '../../Utilities/Graph';
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
			Api.get(`action-types/${id}?include=actions,actions.option`)
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

	const barData = barGraphData(row);
	const lineData = lineGraphData(row);
	const graphOptions = {
		legend: {
			display: false,
		},
		maintainAspectRatio: false,
		scales: {
			xAxes: [{
				type: 'time',
				time: {
					unit: 'day',
					tooltipFormat: 'MMM D, YYYY h:mm a',
				},
			}],
			yAxes: [{
				ticks: {
					beginAtZero: !!barData,
					precision: barData ? 0 : null,
				},
			}],
		},
		plugins: {
			zoom: {
				pan: {
					enabled: true,
					mode: 'x',
				},
				zoom: {
					enabled: true,
					mode: 'x',
				},
			},
		},
	};

	return (
		<>
			<MetaTitle title={row.label} />

			{barData && (
				<div id="chart-container">
					<Bar
						data={barData}
						id="chart"
						options={graphOptions}
					/>
				</div>
			)}

			{lineData && (
				<div id="chart-container">
					<Line
						data={lineData}
						id="chart"
						options={graphOptions}
					/>
				</div>
			)}

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
