import { Field } from '@jlbelanger/formosa';
import { formatDateISO } from '../../../Utilities/Datetime';
import PropTypes from 'prop-types';
import React from 'react';

export default function Filters({ chartRef, fromDate, minDate, range, setFromDate, setRange, setToDate, toDate }) {
	const zoomChart = (newFromDate, newToDate) => {
		const chart = chartRef.current;
		if (!chart || newFromDate.length < 10 || newToDate.length < 10) {
			return;
		}

		const newMinDate = new Date(`${newFromDate} 00:00:00`);
		const newMaxDate = new Date(`${newToDate} 23:59:59`);
		newMaxDate.setDate(newMaxDate.getDate() - 1);

		chart.zoomScale('x', { min: newMinDate.getTime(), max: newMaxDate.getTime() });
	};

	return (
		<>
			<Field
				label="Range:"
				name="range"
				type="radio"
				options={['day', 'week', 'month', 'year', 'all', 'custom']}
				value={range}
				setValue={(newRange) => {
					const today = new Date();
					today.setHours(0);
					today.setMinutes(0);
					today.setSeconds(0);

					let newFromDate = new Date(today.getTime());

					if (newRange === 'all' || newRange === 'custom') {
						newFromDate = minDate;
					} else if (newRange === 'week') {
						newFromDate.setDate(today.getDate() - 6);
					} else if (newRange === 'month') {
						newFromDate.setMonth(today.getMonth() - 1);
					} else if (newRange === 'year') {
						newFromDate.setFullYear(today.getFullYear() - 1);
					}

					let newToDate = new Date(today.getTime());
					newToDate.setDate(today.getDate() + 1);

					newFromDate = formatDateISO(newFromDate);
					newToDate = formatDateISO(newToDate);

					setRange(newRange);
					setFromDate(newFromDate);
					setToDate(newToDate);
					zoomChart(newFromDate, newToDate);
				}}
				wrapperClassName="range"
			/>
			{range !== 'all' && (
				<div className="chart-field-container" id="chart-filters">
					<Field
						aria-label="Filter by start date"
						label="From:"
						setValue={(v) => {
							setFromDate(v);

							if (v.length < 10 || range === 'custom') {
								zoomChart(v, toDate);
								return;
							}

							let newToDate = new Date(`${v} 00:00:00`);
							if (range === 'day') {
								newToDate.setDate(newToDate.getDate() + 1);
							} else if (range === 'week') {
								newToDate.setDate(newToDate.getDate() + 7);
							} else if (range === 'month') {
								newToDate.setMonth(newToDate.getMonth() + 1);
							} else if (range === 'year') {
								newToDate.setFullYear(newToDate.getFullYear() + 1);
							}
							newToDate = formatDateISO(newToDate);
							setToDate(newToDate);
							zoomChart(v, newToDate);
						}}
						size={10}
						type="text"
						value={fromDate}
						wrapperClassName="chart-field"
					/>
					<Field
						aria-label="Filter by end date"
						label="To:"
						setValue={(v) => {
							setToDate(v);

							if (v.length < 10 || range === 'custom') {
								zoomChart(fromDate, v);
								return;
							}

							let newFromDate = new Date(`${v} 00:00:00`);
							if (range === 'day') {
								newFromDate.setDate(newFromDate.getDate() - 1);
							} else if (range === 'week') {
								newFromDate.setDate(newFromDate.getDate() - 7);
							} else if (range === 'month') {
								newFromDate.setMonth(newFromDate.getMonth() - 1);
							} else if (range === 'year') {
								newFromDate.setFullYear(newFromDate.getFullYear() - 1);
							}
							newFromDate = formatDateISO(newFromDate);
							setFromDate(newFromDate);
							zoomChart(newFromDate, v);
						}}
						size={10}
						type="text"
						value={toDate}
						wrapperClassName="chart-field"
						wrapperAttributes={{
							style: {
								paddingLeft: 12,
							},
						}}
					/>
				</div>
			)}
		</>
	);
}

Filters.propTypes = {
	chartRef: PropTypes.object.isRequired,
	fromDate: PropTypes.string.isRequired,
	minDate: PropTypes.object.isRequired,
	range: PropTypes.string.isRequired,
	setFromDate: PropTypes.func.isRequired,
	setRange: PropTypes.func.isRequired,
	setToDate: PropTypes.func.isRequired,
	toDate: PropTypes.string.isRequired,
};
