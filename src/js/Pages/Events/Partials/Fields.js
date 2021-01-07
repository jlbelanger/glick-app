import React, { useContext } from 'react';
import Field from '../../../JsonApiForm/Field';
import FormContext from '../../../JsonApiForm/FormContext';

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
				after={(<label>&nbsp;UTC</label>)}
				label={formState.row.action_type.is_continuous ? 'Start date' : 'Date'}
				name="start_date"
				pattern="\d{4}-\d\d-\d\d \d\d:\d\d:\d\d"
				required
				size="20"
			/>

			{!!formState.row.action_type.is_continuous && (
				<Field
					after={(<label>&nbsp;UTC</label>)}
					label="End date"
					name="end_date"
					pattern="\d{4}-\d\d-\d\d \d\d:\d\d:\d\d"
					size="20"
				/>
			)}

			{formState.row.action_type.field_type === 'number' && (
				<Field
					label="Value"
					inputMode="numeric"
					name="value"
					suffix={formState.row.action_type.suffix}
					wrapperClassName="field--number"
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
