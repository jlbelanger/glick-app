import 'luxon';
import 'chartjs-adapter-luxon';
import {
	BarElement,
	Chart as ChartJS,
	LinearScale,
	LineElement,
	PointElement,
	TimeScale,
	Tooltip,
} from 'chart.js';
import { barGraphData, lineGraphData } from '../../Utilities/Graph';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Api } from '@jlbelanger/formosa';
import { Chart } from 'react-chartjs-2';
import Error from '../../Error';
import { getRowsByDate } from '../../Utilities/Datetime';
import MetaTitle from '../../MetaTitle';
import Row from '../Events/Partials/Row';
import zoomPlugin from 'chartjs-plugin-zoom';

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

	ChartJS.register(BarElement, LineElement, LinearScale, PointElement, TimeScale, Tooltip, zoomPlugin);

	const barData = barGraphData(row);
	const lineData = lineGraphData(row);
	const graphOptions = {
		maintainAspectRatio: false,
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'day',
					tooltipFormat: 'MMM d, yyyy h:mm a',
				},
			},
			y: {
				beginAtZero: !!barData,
				ticks: {
					precision: barData ? 0 : null,
				},
				type: 'linear',
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			zoom: {
				limits: {
					x: {
						min: 'original',
						max: 'original',
					},
				},
				pan: {
					enabled: true,
					mode: 'x',
				},
				zoom: {
					mode: 'x',
					pinch: {
						enabled: true,
					},
					wheel: {
						enabled: true,
					},
				},
			},
		},
	};

	return (
		<>
			<MetaTitle title={row.label} />

			{barData && (
				<div id="chart-container">
					<Chart
						data={barData}
						id="chart"
						options={graphOptions}
						type="bar"
					/>
				</div>
			)}

			{lineData && (
				<div id="chart-container">
					<Chart
						data={lineData}
						id="chart"
						options={graphOptions}
						type="line"
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
