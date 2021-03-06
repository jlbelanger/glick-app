import { formatDatetime, formatTime, isToday } from '../../../Utilities/Datetime';
import { Label } from '@jlbelanger/formosa';
import PropTypes from 'prop-types';
import React from 'react';

export default function NewLabel({ actionType }) {
	let startDate = null;
	if (actionType.in_progress && actionType.in_progress.start_date) {
		if (isToday(actionType.in_progress.start_date)) {
			startDate = formatTime(actionType.in_progress.start_date);
		} else {
			startDate = formatDatetime(actionType.in_progress.start_date);
		}
	}
	return (
		<Label
			htmlFor={actionType.field_type === 'number' ? actionType.slug : null}
			label={actionType.label}
			note={startDate ? `since ${startDate}` : ''}
		/>
	);
}

NewLabel.propTypes = {
	actionType: PropTypes.object.isRequired,
};
