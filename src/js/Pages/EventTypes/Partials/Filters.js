import { Field } from '@jlbelanger/formosa';
import { getChartUnit } from '../../../Utilities/Graph';
import PropTypes from 'prop-types';
import React from 'react';

export default function Filters({ chartRef, fromDate, setFromDate, toDate, setToDate, total }) {
	const zoomChart = (newFromDate, newToDate) => {
		const chart = chartRef.current;
		if (!chart) {
			return;
		}

		const minDate = new Date(`${newFromDate} 12:00:00`);
		const maxDate = new Date(`${newToDate} 12:00:00`);

		const min = minDate.getTime();
		const max = maxDate.getTime();

		chart.options.scales.x.time.unit = getChartUnit(minDate, maxDate);

		chart.zoomScale('x', { min, max });
	};

	return (
		<div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', margin: '16px 0' }}>
			<Field
				label="From"
				setValue={(v) => {
					setFromDate(v);
					zoomChart(v, toDate);
				}}
				type="text"
				size={10}
				value={fromDate}
				wrapperClassName="chart-field"
			/>
			<Field
				label="to"
				setValue={(v) => {
					setToDate(v);
					zoomChart(fromDate, v);
				}}
				type="text"
				size={10}
				value={toDate}
				wrapperClassName="chart-field"
			/>
			<div style={{ flex: '1 1 auto' }} />
			<div>{`Total: ${total.toLocaleString()}`}</div>
		</div>
	);
}

Filters.propTypes = {
	chartRef: PropTypes.object.isRequired,
	fromDate: PropTypes.string.isRequired,
	setFromDate: PropTypes.func.isRequired,
	setToDate: PropTypes.func.isRequired,
	toDate: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
};
