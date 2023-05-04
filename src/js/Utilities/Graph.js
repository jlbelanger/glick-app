export const getChartUnit = (fromDate, toDate) => {
	const min = fromDate.getTime();
	const max = toDate.getTime();
	const diff = max - min;
	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
	let unit = 'year';
	if (diff <= oneDayInMilliseconds) {
		unit = 'hour';
	} else if (diff <= (oneDayInMilliseconds * 7)) {
		unit = 'day';
	} else if (diff <= (oneDayInMilliseconds * 31)) {
		unit = 'week';
	} else if (diff <= (oneDayInMilliseconds * 365)) {
		unit = 'month';
	}
	return unit;
};

export const getDefaultChartUnit = (fromDate, toDate) => {
	const min = fromDate.getTime();
	const max = toDate.getTime();
	const diff = max - min;
	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
	let unit = 'year';
	if (diff <= oneDayInMilliseconds) {
		unit = 'hour';
	} else if (diff <= (oneDayInMilliseconds * 7)) {
		unit = 'day';
	} else if (diff <= (oneDayInMilliseconds * 31)) {
		unit = 'week';
	} else if (diff <= (oneDayInMilliseconds * 365 * 5)) {
		unit = 'month';
	}
	return unit;
};

export const getChartTooltipFormat = (unit) => {
	if (unit === 'year') {
		return 'yyyy';
	}
	if (unit === 'month') {
		return 'MMM yyyy';
	}
	if (unit === 'week') {
		return 'yyyy \'W\'W';
	}
	if (unit === 'day') {
		return 'MMM d, yyyy';
	}
	return 'MMM d, yyyy h:mm a';
};

export const getGraphType = (actionType) => {
	if (actionType.field_type === 'button' && !actionType.is_continuous) {
		return 'bar';
	}
	if (actionType.field_type === 'number') {
		return 'line';
	}
	if (actionType.field_type === 'text') {
		let output = 'line';
		actionType.actions.forEach((action) => {
			if (!/^[0-9./]+$/.test(action.value)) {
				output = 'bar';
			}
		});
		return output;
	}
	return '';
};

export const barGraphData = (actions, unit) => {
	const data = {};
	actions.forEach((action) => {
		const date = new Date(action.date.getTime());
		if (unit === 'year') {
			date.setSeconds(0);
			date.setMinutes(0);
			date.setHours(0);
			date.setDate(1);
			date.setMonth(0);
		} else if (unit === 'month') {
			date.setSeconds(0);
			date.setMinutes(0);
			date.setHours(0);
			date.setDate(1);
		} else if (unit === 'week') {
			date.setSeconds(0);
			date.setMinutes(0);
			date.setHours(0);
			const weekday = date.getDay();
			if (weekday === 0) {
				date.setDate(date.getDate() - 6);
			} else if (weekday !== 1) {
				date.setDate(date.getDate() - (weekday - 1));
			}
		} else if (unit === 'day') {
			date.setSeconds(0);
			date.setMinutes(0);
			date.setHours(0);
		}
		if (Object.prototype.hasOwnProperty.call(data, date)) {
			data[date] += 1;
		} else {
			data[date] = 1;
		}
	});

	const labels = [];
	Object.keys(data).forEach((date) => {
		labels.push(new Date(date));
	});

	return {
		labels,
		datasets: [
			{
				backgroundColor: '#3c9',
				data: Object.values(data),
			},
		],
	};
};

export const lineGraphData = (actionType, actions) => {
	const output = {
		labels: [],
		datasets: [],
	};
	const colors = [
		'#3c9', // green
		'#3f51b5', // blue
		'#f44336', // red
		'#ff9800', // orange
		'#9c27b0', // purple
		'#03a9f4', // cyan
		'#f06292', // pink
		'#ffeb3b', // yellow
		'#8bc34a', // lime
		'#00bcd4', // teal
		'#673ab7', // purple
	];

	const points = [];
	if (actionType.field_type === 'number') {
		points.push([]);
	}

	actions.forEach((action) => {
		output.labels.push(action.date);
		if (/^[0-9./]+$/.test(action.value)) {
			action.value.split('/').forEach((value, i) => {
				if (points.length < (i + 1)) {
					points.push([]);
				}
				points[i].push(value);
			});
		} else if (actionType.field_type === 'number') {
			points[0].push(action.value);
		}
	});

	if (points.length <= 0) {
		return null;
	}

	points.forEach((pointsList, i) => {
		output.datasets.push({
			backgroundColor: colors[i],
			borderColor: colors[i],
			borderWidth: 2,
			borderCapStyle: 'round',
			fill: false,
			data: pointsList,
		});
	});

	return output;
};
