import { formatDatetimeISO, pad } from '../../../Utilities/Datetime';
import { Field } from '@jlbelanger/formosa';
import { getChartTooltipFormat } from '../../../Utilities/Graph';
import PropTypes from 'prop-types';
import React from 'react';

const getWeek = (date) => {
	const year = date.getFullYear();
	const firstWeek = new Date(year, 0, 4); // https://en.wikipedia.org/wiki/ISO_week_date#First_week
	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
	const dayOfYear = Math.ceil((date.getTime() - firstWeek.getTime()) / oneDayInMilliseconds) - 3;
	const week = 1 + Math.ceil(dayOfYear / 7);
	return `${year}-w${pad(week)}`;
};

const getPeriod = (date, range) => {
	const dateString = formatDatetimeISO(date);
	if (range === 'year') {
		return dateString.substring(0, 4);
	}
	if (range === 'month') {
		return dateString.substring(0, 7);
	}
	if (range === 'week') {
		return getWeek(date);
	}
	if (range === 'day') {
		return dateString.substring(0, 10);
	}
	if (range === 'hour') {
		return dateString.substring(0, 13);
	}
	return null;
};

const createPeriodGroups = (minDate, maxDate, range) => {
	minDate.setMinutes(0);
	minDate.setSeconds(0);

	maxDate.setMinutes(0);
	maxDate.setSeconds(0);

	if (range !== 'hour') {
		minDate.setHours(0);

		maxDate.setHours(0);

		if (range === 'week') {
			const minWeekday = minDate.getDay();
			if (minWeekday !== 0) {
				minDate.setDate(6 - minWeekday);
			}
		} else if (range !== 'day') {
			minDate.setDate(1);

			maxDate.setDate(1);

			if (range !== 'month') {
				minDate.setMonth(0);

				maxDate.setMonth(0);
			}
		}
	}

	const output = {};
	output[getPeriod(minDate, range)] = [];

	while (minDate < maxDate) {
		if (range === 'year') {
			minDate.setFullYear(minDate.getFullYear() + 1);
		} else if (range === 'month') {
			minDate.setMonth(minDate.getMonth() + 1);
		} else if (range === 'week' || range === 'day') {
			minDate.setDate(minDate.getDate() + 1);
		} else if (range === 'hour') {
			minDate.setHours(minDate.getHours() + 1);
		}

		output[getPeriod(minDate, range)] = [];
	}

	return output;
};

const groupByPeriod = (output, rows, range) => {
	rows.forEach((row) => {
		output[getPeriod(row.date, range)].push(row.value);
	});
	return output;
};

const round = (value) => {
	if (Math.floor(value) === Math.ceil(value)) {
		return Math.round(value).toLocaleString();
	}
	return parseFloat(value.toFixed(1)).toLocaleString();
};

const calculate = (values) => {
	// Calculate the average.
	const numValues = values.length;
	values = values.sort((a, b) => (a - b));
	const sum = values.reduce((partialSum, n) => (partialSum + n), 0);
	const average = round(sum / numValues);

	// Calculate the median.
	const i = (numValues - 1) / 2;
	let median;
	if (numValues % 2 === 0) {
		median = round((values[Math.floor(i)] + values[Math.ceil(i)]) / 2);
	} else {
		median = round(values[i]);
	}

	return {
		average,
		median,
		min: values[0],
		max: values[numValues - 1],
	};
};

export default function Stats({ actions, chartRef, fromDate, graphType, setUnit, suffix, toDate, total, unit }) {
	const rows = actions;

	let results = {};

	if (graphType === 'bar') {
		let groupedRows = createPeriodGroups(new Date(`${fromDate}T00:00:00`), new Date(`${toDate}T23:59:59`), unit);
		groupedRows = groupByPeriod(groupedRows, rows, unit);

		const numPerPeriod = {};
		Object.keys(groupedRows).forEach((key) => {
			numPerPeriod[key] = Object.values(groupedRows[key]).length;
		});

		results = calculate(Object.values(numPerPeriod));
	} else if (graphType === 'line') {
		const values = [];
		const valuesSlash = {};
		let hasSlash = true;

		Object.values(actions).forEach((action) => {
			if (/^[0-9./]+\/[0-9./]+$/.test(action.value)) {
				values.push(parseFloat(action.value));
				action.value.split('/').forEach((value, i) => {
					if (!Object.prototype.hasOwnProperty.call(valuesSlash, i)) {
						valuesSlash[i] = [];
					}
					valuesSlash[i].push(parseFloat(value));
				});
			} else {
				values.push(parseFloat(action.value));
				hasSlash = false;
			}
		});

		if (hasSlash) {
			const slashResults = {};

			Object.values(valuesSlash).forEach((vals) => {
				const res = calculate(vals);
				Object.keys(res).forEach((key) => {
					if (!Object.prototype.hasOwnProperty.call(slashResults, key)) {
						slashResults[key] = [];
					}
					slashResults[key].push(res[key]);
				});
			});

			Object.keys(slashResults).forEach((key) => {
				results[key] = slashResults[key].join('/');
			});
		} else {
			results = calculate(values);
		}
	}

	return (
		<>
			<div className="chart-field-container" id="chart-stats">
				<div className="stat">
					{`Average: ${results.average === undefined ? '?' : results.average} ${suffix || ''}`.trim()}
				</div>
				<div className="stat">
					{`Median: ${results.median === undefined ? '?' : results.median} ${suffix || ''}`.trim()}
				</div>
				<div className="stat">
					{`Min: ${results.min === undefined ? '?' : results.min} ${suffix || ''}`.trim()}
				</div>
				<div className="stat">
					{`Max: ${results.max === undefined ? '?' : results.max} ${suffix || ''}`.trim()}
				</div>
				<div className="stat">
					{`Total: ${total.toLocaleString()}`}
				</div>
			</div>
			{graphType === 'bar' && (
				<Field
					label="Per:"
					name="unit"
					type="radio"
					options={['day', 'week', 'month', 'year']}
					value={unit}
					setValue={(v) => {
						const chart = chartRef.current;
						if (chart) {
							chart.options.scales.x.time.unit = v;
							chart.options.scales.x.time.tooltipFormat = getChartTooltipFormat(v);
						}

						setUnit(v);
					}}
					wrapperClassName="unit"
				/>
			)}
		</>
	);
}

Stats.propTypes = {
	actions: PropTypes.array.isRequired,
	chartRef: PropTypes.object.isRequired,
	fromDate: PropTypes.string.isRequired,
	graphType: PropTypes.string.isRequired,
	setUnit: PropTypes.func.isRequired,
	suffix: PropTypes.string,
	toDate: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	unit: PropTypes.string.isRequired,
};

Stats.defaultProps = {
	suffix: '',
};
