import PropTypes from 'prop-types';
import React from 'react';

export default function Label({ actionType }) {
	return (
		<div>
			<label htmlFor={actionType.field_type !== 'string' ? actionType.slug : null}>
				{actionType.label}
			</label>
			{/* <small>(since 8am)</small> */}
		</div>
	);
}

Label.propTypes = {
	actionType: PropTypes.object.isRequired,
};
