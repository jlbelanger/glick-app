import 'luxon';
import 'chartjs-adapter-luxon'; // eslint-disable-line import/no-unresolved
import {
	BarController,
	BarElement,
	Chart as ChartJS,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	Tooltip,
} from 'chart.js';
import { barGraphData, getGraphType, lineGraphData } from '../../Utilities/Graph';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Api } from '@jlbelanger/formosa';
import { Chart } from 'react-chartjs-2'; // eslint-disable-line import/no-unresolved
import ChartScale from './Partials/ChartScale';
import Error from '../../Error';
import { getRowsByDate } from '../../Utilities/Datetime';
import MetaTitle from '../../MetaTitle';
import Row from '../Events/Partials/Row';
import zoomPlugin from 'chartjs-plugin-zoom';

export default function Edit() {
	const { id } = useParams();
	const chartRef = useRef(null);
	const [row, setRow] = useState(null);
	const [error, setError] = useState(false);
	const [graphData, setGraphData] = useState(null);
	const [graphOptions, setGraphOptions] = useState(null);
	const [graphType, setGraphType] = useState(null);

	useEffect(() => {
		let ignore = false;

		if (id) {
			Api.get(`action-types/${id}?include=actions,actions.option`)
				.then((response) => {
					if (ignore) {
						return;
					}

					setRow(response);

					let data = null;
					const newGraphType = getGraphType(response);
					if (newGraphType === 'bar') {
						data = barGraphData(response);
					} else if (newGraphType === 'line') {
						data = lineGraphData(response);
					}

					let minX = null;
					let maxX = null;
					data.labels.forEach((date) => {
						const time = date.getTime();
						if (!minX || time < minX) {
							minX = time;
						}
						if (!maxX || time > maxX) {
							maxX = time;
						}
					});
					const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
					const oneYearInMilliseconds = oneDayInMilliseconds * 365;
					let limitX = minX;
					if ((maxX - minX) < oneYearInMilliseconds) {
						limitX = maxX - oneYearInMilliseconds;
					}

					const newGraphOptions = {
						maintainAspectRatio: false,
						scales: {
							x: {
								bounds: 'data',
								time: {
									tooltipFormat: 'MMM d, yyyy h:mm a',
									unit: 'day',
								},
								type: 'time',
							},
							y: {
								beginAtZero: newGraphType === 'bar',
								bounds: 'data',
								ticks: {
									precision: newGraphType === 'bar' ? 0 : null,
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
										min: limitX,
										max: maxX,
									},
									y: {
										min: newGraphType === 'bar' ? 0 : null,
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
										enabled: false,
									},
								},
							},
						},
					};

					window.HAS_ZOOMED = false;

					const defaultZoomPlugin = {
						id: 'defaultzoom',
						beforeBuildTicks: (chart) => {
							if (!window.HAS_ZOOMED) {
								const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
								window.HAS_ZOOMED = true;
								chart.zoomScale('x', { min: maxX - oneMonthInMilliseconds, max: maxX });
							}
						},
					};

					ChartJS.register(
						BarController,
						BarElement,
						LineController,
						LineElement,
						LinearScale,
						PointElement,
						TimeScale,
						Tooltip,
						zoomPlugin,
						defaultZoomPlugin
					);

					setGraphData(data);
					setGraphOptions(newGraphOptions);
					setGraphType(newGraphType);
				})
				.catch((response) => {
					setError(response.status);
				});
		}

		return () => {
			ignore = true;
		};
	}, [id]);

	if (error) {
		return (
			<Error status={error} />
		);
	}

	if (row === null) {
		return (
			<MetaTitle title="Loading..." />
		);
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
			<MetaTitle title={row.label}>
				<Link to={`/event-types/${row.id}/edit`}>Edit</Link>
			</MetaTitle>

			{graphData && graphOptions && graphType && (
				<>
					<div id="chart-container">
						<Chart
							ref={chartRef}
							data={graphData}
							id="chart"
							options={graphOptions}
							type={graphType}
						/>
					</div>

					<ChartScale chartRef={chartRef} />
				</>
			)}

			<table>
				<tbody>
					{Object.keys(rowsByDate).map((date) => (
						<Row key={date} date={date} rows={addActionTypeToActions(rowsByDate[date])} />
					))}
				</tbody>
			</table>
		</>
	);
}
