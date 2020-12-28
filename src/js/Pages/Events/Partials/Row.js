import { formatDate, formatTime } from '../../../Utilities/Datetime';
import { getEventLabel } from '../../../Utilities';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

export default function Row({ date, rows }) {
	return (
		<>
			<tr>
				<th>{formatDate(date)}</th>
			</tr>
			{rows.map((row) => (
				<tr className="table__row" key={row.id}>
					<td>
						<Link className="table__link" to={`/events/${row.id}`}>
							<span className="table__label">
								{getEventLabel(row)}
							</span>
							<span className="table__time">
								{formatTime(row.start_date)}
							</span>
						</Link>
					</td>
				</tr>
			))}
		</>
	);
}

Row.propTypes = {
	date: PropTypes.string.isRequired,
	rows: PropTypes.array.isRequired,
};
