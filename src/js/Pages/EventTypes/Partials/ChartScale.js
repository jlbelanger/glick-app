import React, { useState } from 'react';
import { Field } from '@jlbelanger/formosa';
import PropTypes from 'prop-types';

export default function ChartScale({ chartRef }) {
	const [scale, setScale] = useState('Month');

	const chart = chartRef.current;
	if (chart) {
		const max = chart.config._config.options.plugins.zoom.limits.x.max; // eslint-disable-line no-underscore-dangle
		let min = chart.config._config.options.plugins.zoom.limits.x.min; // eslint-disable-line no-underscore-dangle
		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
		if (scale === 'Month') {
			min = max - (oneDayInMilliseconds * 30);
			chart.options.scales.x.time.unit = 'day';
		} else if (scale === 'Year') {
			min = max - (oneDayInMilliseconds * 365);
			chart.options.scales.x.time.unit = 'month';
		} else {
			chart.options.scales.x.time.unit = 'month';
		}
		chart.zoomScale('x', { min, max });
	}

	return (
		<Field
			label="Scale:"
			name="radio"
			type="radio"
			options={['Month', 'Year', 'All']}
			value={scale}
			setValue={setScale}
			wrapperClassName="scale"
		/>
	);
}

ChartScale.propTypes = {
	chartRef: PropTypes.object.isRequired,
};
