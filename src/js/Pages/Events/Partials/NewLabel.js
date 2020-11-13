import Label from '../../../JsonApiForm/Label';
import PropTypes from 'prop-types';
import React from 'react';

export default function NewLabel({ actionType }) {
	// TODO: note="since 8am"
	return (
		<Label
			htmlFor={actionType.field_type === 'number' ? actionType.slug : null}
			label={actionType.label}
		/>
	);
}

NewLabel.propTypes = {
	actionType: PropTypes.object.isRequired,
};
