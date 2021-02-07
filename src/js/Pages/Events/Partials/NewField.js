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
					inputMode="decimal"
					required
					type="text"
					suffix={actionType.suffix}
					wrapperClassName="field--new-event field--number"
				/>
			</>
		);
	}

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

	const options = [...actionType.options];
	const hasOptions = options.length > 0;
	if (!hasOptions) {
		if (actionType.is_continuous) {
			if (actionType.in_progress) {
				options.push('Stop');
			} else {
				options.push('Start');
			}
		} else {
			options.push('Add');
		}
	} else if (actionType.in_progress) {
		options.push('Stop');
	}

	return (
		<>
			<Field
				afterChange={afterChange}
				name={hasOptions ? 'option' : 'value'}
				nameKey="label"
				options={options}
				type="radio"
			/>
			<button id={submitId} style={{ display: 'none' }} type="submit" />
		</>
	);
}

NewField.propTypes = {
	actionType: PropTypes.object.isRequired,
};
