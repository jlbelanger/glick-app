import { Field } from '@jlbelanger/formosa';
import PropTypes from 'prop-types';
import React from 'react';

export default function NewField({ actionType }) {
	const attributes = {
		className: 'formosa-prefix',
		id: actionType.slug,
		name: 'value',
		postfix: (<button className="formosa-button formosa-postfix" type="submit">Add</button>),
		required: true,
		type: 'text',
	};

	if (actionType.field_type === 'number') {
		return (
			<Field
				{...attributes}
				inputMode="decimal"
				suffix={actionType.suffix}
				wrapperClassName="field--new-event field--number"
			/>
		);
	}

	if (actionType.field_type === 'text') {
		return (
			<Field
				{...attributes}
				maxLength={255}
				wrapperClassName="field--new-event field--text"
			/>
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
		return {};
	};

	const options = [...actionType.options];
	const hasOptions = options.length > 0;
	if (!hasOptions) {
		let label = 'Add';
		if (actionType.is_continuous) {
			if (actionType.in_progress) {
				label = 'Stop';
			} else {
				label = 'Start';
			}
		}
		return (
			<button className="formosa-button" type="submit">{label}</button>
		);
	}

	if (actionType.in_progress) {
		options.push('Stop');
	}

	return (
		<>
			<Field
				afterChange={afterChange}
				name={hasOptions ? 'option' : 'value'}
				labelKey="label"
				options={options}
				type="radio"
				valueKey={(option) => ({ id: option.id, type: option.type })}
			/>
			<button id={submitId} style={{ display: 'none' }} type="submit" />
		</>
	);
}

NewField.propTypes = {
	actionType: PropTypes.object.isRequired,
};
