import PropTypes from 'prop-types';
import React from 'react';

export default function Field({ actionType }) {
	if (['float', 'number'].includes(actionType.field_type)) {
		return (
			<div className="postfix-container">
				<div className="input-container">
					<input id={actionType.slug} type="text" />
					{actionType.suffix && <span>{actionType.suffix}</span>}
				</div>
				<button className="postfix" type="submit">Add</button>
			</div>
		);
	}

	if (actionType.options) {
		const options = actionType.options.split(',');
		return (
			<div>
				{options.map(option => (
					<button key={option} type="submit">
						{/* className="active" */}
						{option}
					</button>
				))}
				{/* <button type="submit">Stop</button> */}
			</div>
		);
	}

	return (
		<div>
			<button type="submit">Start</button>
		</div>
	);
}

Field.propTypes = {
	actionType: PropTypes.object.isRequired,
};
