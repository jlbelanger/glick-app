export const getCurrentDatetime = () => (
	new Date().toISOString().substring(0, 19).replace('T', ' ')
);

export const getDateFromDatetime = (datetime) => (
	new Date(`${datetime.replace(' ', 'T')}.000Z`).toLocaleString('en-CA').substring(0, 10)
);

export const pad = (n, width = 2, z = '0') => {
	z = z || '0';
	n = n.toString();
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const getDatetimeInUserTimezone = (datetime) => (
	new Date(`${datetime.replace(' ', 'T')}.000Z`)
);

export const formatDatetimeISO = (date) => {
	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());
	const output = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return output;
};

export const formatDateISO = (date) => (
	formatDatetimeISO(date).substring(0, 10)
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

export const formatTime = (datetime) => {
	const output = new Date(`${datetime.replace(' ', 'T')}.000Z`).toLocaleTimeString('en-CA', {
		hour: 'numeric',
		minute: 'numeric',
	});
	return output.replace('a.m.', 'AM').replace('p.m.', 'PM');
};

export const isToday = (datetime) => (
	getDateFromDatetime(datetime) === new Date().toISOString().substring(0, 10)
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
