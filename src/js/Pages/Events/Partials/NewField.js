import Field from '../../../JsonApiForm/Field';
import PropTypes from 'prop-types';
import React from 'react';

export default function NewField({ actionType }) {
	if (actionType.field_type === 'number') {
		return (
			<>
				<Field
					after={(
						<button className="postfix" type="submit">Add</button>
					)}
					className="prefix"
					id={actionType.slug}
					name="value"
					inputMode="numeric"
					required
					type="text"
					suffix={actionType.suffix}
					wrapperClassName="field--new-event field--number"
				/>
			</>
		);
	}

	if (actionType.options) {
		const submitId = `submit-${actionType.id}`;
		const afterChange = (e) => {
			// TODO: Ensure afterChange is called after the form state has been
			// updated, then remove setTimeout here.
			setTimeout(() => {
				if (e.target.value === 'Stop') {
					document.getElementById(`${submitId}-stop`).click();
				} else {
					document.getElementById(submitId).click();
				}
			}, 100);
		};

		const options = actionType.options.split(', ');
		if (actionType.in_progress) {
			options.push('Stop');
		}

		return (
			<>
				<Field
					afterChange={afterChange}
					name="value"
					options={options}
					type="radio"
				/>
				<button id={submitId} style={{ display: 'none' }} type="submit" />
			</>
		);
	}

	let label = 'Add';
	if (actionType.is_continuous) {
		label = actionType.in_progress ? 'Stop' : 'Start';
	}

	return (
		<div>
			<button type="submit">
				{label}
			</button>
		</div>
	);
}

NewField.propTypes = {
	actionType: PropTypes.object.isRequired,
};
