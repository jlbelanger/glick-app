import React, { useState } from 'react';
import { Field } from '@jlbelanger/formosa';
import { formatDatetimeISO } from '../../../Utilities/Datetime';
import PropTypes from 'prop-types';

const getDateLimits = (rows) => {
	if (rows.length <= 0) {
		return {
			min: new Date(),
			max: new Date(),
		};
	}

	let min = null;
	let max = null;

	rows.forEach((row) => {
		if (!min || row.date < min) {
			min = row.date;
		}
		if (!max || row.date > max) {
			max = row.date;
		}
	});

	// Clone to prevent modifying the original date.
	return {
		min: new Date(min.getTime()),
		max: new Date(max.getTime()),
	};
};

const getPeriod = (date, period) => {
	const dateString = formatDatetimeISO(date);
	if (period === 'Year') {
		return dateString.substring(0, 4);
	}
	if (period === 'Month') {
		return dateString.substring(0, 7);
	}
	if (period === 'Day') {
		return dateString.substring(0, 10);
	}
	if (period === 'Hour') {
		return dateString.substring(0, 13);
	}
	return null;
};

const createPeriodGroups = (minDate, maxDate, period) => {
	minDate.setMinutes(0);
	minDate.setSeconds(0);

	maxDate.setMinutes(0);
	maxDate.setSeconds(0);

	if (period !== 'Hour') {
		minDate.setHours(0);

		maxDate.setHours(0);

		if (period !== 'Day') {
			minDate.setDate(1);

			maxDate.setDate(1);

			if (period !== 'Month') {
				minDate.setMonth(0);

				maxDate.setMonth(0);
			}
		}
	}

	const output = {};
	output[getPeriod(minDate, period)] = [];

	while (minDate < maxDate) {
		if (period === 'Year') {
			minDate.setFullYear(minDate.getFullYear() + 1);
		} else if (period === 'Month') {
			minDate.setMonth(minDate.getMonth() + 1);
		} else if (period === 'Day') {
			minDate.setDate(minDate.getDate() + 1);
		} else if (period === 'Hour') {
			minDate.setHours(minDate.getHours() + 1);
		}

		output[getPeriod(minDate, period)] = [];
	}

	return output;
};

const groupByPeriod = (output, rows, period) => {
	rows.forEach((row) => {
		output[getPeriod(row.date, period)].push(row.value);
	});

	return output;
};

const round = (value) => {
	if (Math.floor(value) === Math.ceil(value)) {
		return Math.round(value).toLocaleString();
	}
	return parseFloat(value.toFixed(1)).toLocaleString();
};

export default function Stats({ actions, graphType }) {
	const rows = actions;
	const [period, setPeriod] = useState('Month');
	const { min: minDate, max: maxDate } = getDateLimits(rows);

	let resultAverage = 0;
	let resultMedian = 0;

	if (graphType === 'bar') {
		let groupedRows = createPeriodGroups(minDate, maxDate, period);
		groupedRows = groupByPeriod(groupedRows, rows, period);

		// Count the occurrences per period.
		const numPerPeriod = {};
		Object.keys(groupedRows).forEach((key) => {
			numPerPeriod[key] = Object.values(groupedRows[key]).length;
		});

		// Calculate the average.
		const numPeriods = Object.keys(numPerPeriod).length;
		const sum = Object.values(numPerPeriod).reduce((partialSum, n) => (partialSum + n), 0);
		resultAverage = round(sum / numPeriods);

		// Calculate the median.
		const nums = Object.values(numPerPeriod).sort();
		const numNums = nums.length;
		const i = (numNums - 1) / 2;
		if (numNums % 2 === 0) {
			resultMedian = round((nums[Math.floor(i)] + nums[Math.ceil(i)]) / 2);
		} else {
			resultMedian = round(nums[i]);
		}
	} else if (graphType === 'line') {
		// Calculate the average.
		const values = Object.values(actions).map((action) => (parseFloat(action.value))).sort();
		const numValues = values.length;
		const sum = values.reduce((partialSum, n) => (partialSum + n), 0);
		resultAverage = round(sum / numValues);

		// Calculate the median.
		const i = (numValues - 1) / 2;
		if (numValues % 2 === 0) {
			resultMedian = round((values[Math.floor(i)] + values[Math.ceil(i)]) / 2);
		} else {
			resultMedian = round(values[i]);
		}
	}

	return (
		<div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
			{graphType === 'bar' && (
				<Field
					hideBlank
					label="Per"
					options={['Hour', 'Day', 'Month', 'Year']}
					setValue={setPeriod}
					type="select"
					value={period}
					wrapperClassName="chart-field"
				/>
			)}
			<div>{`Average: ${resultAverage}`}</div>
			<div>{`Median: ${resultMedian}`}</div>
		</div>
	);
}

Stats.propTypes = {
	actions: PropTypes.array.isRequired,
	graphType: PropTypes.string.isRequired,
};
