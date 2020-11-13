import React, { useContext } from 'react';
import Field from '../../../JsonApiForm/Field';
import FormContext from '../../../JsonApiForm/FormContext';

export default function Fields() {
	const { formState } = useContext(FormContext);
	return (
		<>
			<Field
				label="Label"
				name="label"
				required
			/>

			<Field
				label="Type"
				name="field_type"
				required
				type="radio"
				options={{
					button: 'Buttons',
					number: 'Number',
				}}
			/>

			{formState.row.field_type === 'button' && (
				<>
					<Field
						label="Has stop time?"
						name="is_continuous"
						type="checkbox"
					/>

					<Field
						label="Options"
						name="options"
						note={`default: ${formState.row.is_continuous ? 'Start/Stop' : 'Add'}; separate multiple options by commas`}
					/>
				</>
			)}

			{formState.row.field_type === 'number' && (
				<Field
					label="Suffix"
					name="suffix"
					note="optional, eg. lbs"
				/>
			)}
		</>
	);
}
