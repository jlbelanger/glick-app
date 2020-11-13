import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

export default function Row({ date, rows }) {
	const formatDate = (d) => {
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		return new Date(`${d}T12:00:00Z`).toLocaleString('en-CA', options);
	};

	const formatTime = (datetime) => {
		const options = {
			hour: 'numeric',
			minute: 'numeric',
		};
		return new Date(`${datetime.replace(' ', 'T')}.000Z`).toLocaleTimeString('en-CA', options);
	};

	return (
		<>
			<tr>
				<th>{formatDate(date)}</th>
			</tr>
			{rows.map((row) => {
				let label = row.action_type.label;
				if (row.value) {
					let value = row.value;
					if (row.action_type.suffix) {
						value += ` ${row.action_type.suffix}`;
					}
					label += ` (${value})`;
				}
				return (
					<tr className="table__row" key={row.id}>
						<td>
							<Link className="table__link" to={`/events/${row.id}`}>
								<span className="table__label">
									{label}
								</span>
								<span className="table__time">
									{formatTime(row.start_date)}
								</span>
							</Link>
						</td>
					</tr>
				);
			})}
		</>
	);
}

Row.propTypes = {
	date: PropTypes.string.isRequired,
	rows: PropTypes.array.isRequired,
};
