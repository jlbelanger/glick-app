import { Field, FormContext } from '@jlbelanger/formosa';
import React, { useContext } from 'react';

export default function Fields() {
	const { formState } = useContext(FormContext);
	const options = {};
	if (formState.row.action_type.options) {
		formState.row.action_type.options.forEach((option) => {
			options[option.label] = option.label;
		});
	}

	return (
		<>
			<Field
				label={formState.row.action_type.is_continuous ? 'Start date' : 'Date'}
				name="start_date"
				required
				type="datetime"
			/>

			{!!formState.row.action_type.is_continuous && (
				<Field
					label="End date"
					name="end_date"
					type="datetime"
				/>
			)}

			{formState.row.action_type.field_type !== 'button' && (
				<Field
					label="Value"
					inputMode="decimal"
					name="value"
					suffix={formState.row.action_type.suffix}
					wrapperClassName={`field--${formState.row.action_type.field_type}`}
				/>
			)}

			{formState.row.action_type.options && (
				<Field
					label="Value"
					name="value"
					options={options}
					type="radio"
				/>
			)}
		</>
	);
}
