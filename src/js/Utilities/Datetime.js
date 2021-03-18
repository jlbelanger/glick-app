export const getCurrentDatetime = () => (
	new Date().toISOString().substr(0, 19).replace('T', ' ')
);

export const getDateFromDatetime = (datetime) => (
	new Date(`${datetime.replace(' ', 'T')}.000Z`).toLocaleString('en-CA').substring(0, 10)
);

export const formatDate = (date) => (
	new Date(`${date}T12:00:00Z`).toLocaleString('en-CA', {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
);

export const formatDatetime = (datetime) => (
	new Date(`${datetime.replace(' ', 'T')}.000Z`).toLocaleString('en-CA', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})
);

export const formatTime = (datetime) => (
	new Date(`${datetime.replace(' ', 'T')}.000Z`).toLocaleTimeString('en-CA', {
		hour: 'numeric',
		minute: 'numeric',
	})
);

export const isToday = (datetime) => (
	getDateFromDatetime(datetime) === new Date().toISOString().substr(0, 10)
);

export const getRowsByDate = (rows) => {
	const output = {};
	rows.forEach((row) => {
		const date = getDateFromDatetime(row.start_date);
		if (!Object.prototype.hasOwnProperty.call(output, date)) {
			output[date] = [];
		}
		output[date].push(row);
	});
	return output;
};
