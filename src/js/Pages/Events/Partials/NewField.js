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
		const afterChange = () => {
			// TODO: Ensure afterChange is called after the form state has been
			// updated, then remove setTimeout here.
			setTimeout(() => {
				document.getElementById(submitId).click();
			}, 100);
		};

		return (
			<>
				<Field
					afterChange={afterChange}
					name="value"
					options={actionType.options.split(', ')}
					type="radio"
				/>
				<button id={submitId} style={{ display: 'none' }} type="submit" />
			</>
		);
	}

	return (
		<div>
			<button type="submit">
				{actionType.is_continuous ? 'Start' : 'Add'}
			</button>
		</div>
	);
}

NewField.propTypes = {
	actionType: PropTypes.object.isRequired,
};
