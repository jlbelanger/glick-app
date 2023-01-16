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
import { barGraphData, getChartUnit, getGraphType, lineGraphData } from '../../Utilities/Graph';
import { formatDatetimeISO, getDatetimeInUserTimezone, getRowsByDate } from '../../Utilities/Datetime';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Api } from '@jlbelanger/formosa';
import { Chart } from 'react-chartjs-2'; // eslint-disable-line import/no-unresolved
import Error from '../../Error';
import Filters from './Partials/Filters';
import MetaTitle from '../../MetaTitle';
import Row from '../Events/Partials/Row';
import Stats from './Partials/Stats';
import zoomPlugin from 'chartjs-plugin-zoom';

const convertToCurrentTimezone = (rows) => {
	const output = [];

	rows.forEach((row) => {
		const datetime = getDatetimeInUserTimezone(row.start_date);
		output.push({
			...row,
			date: datetime,
		});
	});

	return output;
};

const toDateString = (date) => (
	formatDatetimeISO(date).substring(0, 10)
);

const filterByDates = (rows, fromDate, toDate) => {
	const output = [];

	rows.forEach((row) => {
		const date = toDateString(row.date);
		if (date >= fromDate && date <= toDate) {
			output.push(row);
		}
	});

	return output;
};

export default function Edit() {
	const { id } = useParams();
	const chartRef = useRef(null);
	const [row, setRow] = useState(null);
	const [actions, setActions] = useState([]);
	const [error, setError] = useState(false);
	const [graphData, setGraphData] = useState(null);
	const [graphOptions, setGraphOptions] = useState(null);
	const [graphType, setGraphType] = useState('');
	const [minDate, setMinDate] = useState(null);
	const defaultDate = useMemo(() => (new Date()));
	const [fromDate, setFromDate] = useState(toDateString(defaultDate));
	const [toDate, setToDate] = useState(toDateString(defaultDate));

	useEffect(() => {
		let ignore = false;

		if (id) {
			Api.get(`action-types/${id}?include=actions,actions.option`)
				.then((response) => {
					if (ignore) {
						return;
					}

					setRow(response);

					const newActions = convertToCurrentTimezone(response.actions);
					newActions.forEach((action) => {
						action.action_type = response;
					});
					setActions(newActions);

					let data = null;
					const newGraphType = getGraphType(response);
					if (newGraphType === 'bar') {
						data = barGraphData(newActions);
					} else if (newGraphType === 'line') {
						data = lineGraphData(response, newActions);
					}

					let minDatetime = null;
					let minX = null;
					let maxX = null;
					newActions.forEach((action) => {
						const time = action.date.getTime();
						if (!minX || time < minX) {
							minX = time;
						}
						if (!maxX || time > maxX) {
							maxX = time;
						}
						if (!minDate || time < minDatetime) {
							minDatetime = time;
						}
					});
					minDatetime = new Date(minDatetime);

					const newGraphOptions = {
						maintainAspectRatio: false,
						scales: {
							x: {
								bounds: 'data',
								time: {
									tooltipFormat: newGraphType === 'bar' ? 'MMM d, yyyy' : 'MMM d, yyyy h:mm a',
									unit: getChartUnit(minDatetime, defaultDate),
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
										min: minX,
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

					ChartJS.register(
						BarController,
						BarElement,
						LineController,
						LineElement,
						LinearScale,
						PointElement,
						TimeScale,
						Tooltip,
						zoomPlugin
					);

					setMinDate(minDatetime);
					setFromDate(toDateString(minDatetime));
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

	let rows = actions;
	if ((minDate && toDateString(minDate) !== fromDate) || toDateString(defaultDate) !== toDate) {
		rows = filterByDates(rows, fromDate, toDate);
	}
	const rowsByDate = getRowsByDate(rows);

	return (
		<>
			<MetaTitle title={row.label}>
				<Link to={`/event-types/${row.id}/edit`}>Edit</Link>
			</MetaTitle>

			<Filters
				chartRef={chartRef}
				fromDate={fromDate}
				setFromDate={setFromDate}
				setToDate={setToDate}
				toDate={toDate}
				total={rows.length}
			/>

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

					<Stats actions={rows} graphType={graphType} />
				</>
			)}

			<table>
				<tbody>
					{Object.keys(rowsByDate).map((date) => (
						<Row key={date} date={date} rows={rowsByDate[date]} />
					))}
				</tbody>
			</table>
		</>
	);
}
