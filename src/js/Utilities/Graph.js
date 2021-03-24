export const barGraphData = (actionType) => {
	if (actionType.field_type !== 'button' || actionType.is_continuous) {
		return null;
	}

	const output = {};

	actionType.actions.forEach((action) => {
		const date = new Date(`${action.start_date.substring(0, 10)}T00:00:00.000Z`);
		if (Object.prototype.hasOwnProperty.call(output, date)) {
			output[date] += 1;
		} else {
			output[date] = 1;
		}
	});

	return {
		labels: Object.keys(output),
		datasets: [
			{
				backgroundColor: '#3c9',
				data: Object.values(output),
			},
		],
	};
};

export const lineGraphData = (actionType) => {
	if (actionType.field_type === 'button') {
		return null;
	}

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

	actionType.actions.forEach((action) => {
		output.labels.push(new Date(`${action.start_date.replace(' ', 'T')}.000Z`));
		if (action.value.includes('/')) {
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
