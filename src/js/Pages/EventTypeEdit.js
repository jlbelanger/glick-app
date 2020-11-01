import React, { useEffect, useState } from 'react';
import API from '../Helpers/API';
import Field from '../Field';
import Form from '../Form';
import Submit from '../Submit';
import { useParams } from 'react-router-dom';

export default function EventTypeEdit() {
	const { id } = useParams();
	const [row, setRow] = useState(null);
	useEffect(() => {
		if (row === null) {
			API.get(`action-types/${id}`)
				.then((response) => {
					setRow(response);
				});
		}
		return () => {};
	});

	if (row === null) {
		return null;
	}

	return (
		<>
			<h2>{`Edit ${row.label}`}</h2>

			<Form action={`action-types/${id}`} method="PUT">
				<Field
					label="Label"
					name="label"
					row={row}
					setRow={setRow}
				/>

				<Field
					label="Type"
					name="field_type"
					row={row}
					setRow={setRow}
					type="radio"
					options={{
						buttons: 'Buttons',
						number: 'Number',
					}}
				/>

				{row.field_type === 'buttons' && (
					<>
						<Field
							label="Options"
							name="options"
							note="separate multiple options by commas"
							row={row}
							setRow={setRow}
							type="textarea"
						/>

						<Field
							label="Has stop time?"
							name="is_discrete"
							row={row}
							setRow={setRow}
							type="checkbox"
						/>
					</>
				)}

				{row.field_type === 'number' && (
					<Field
						label="Suffix"
						name="suffix"
						note="optional, eg. lbs"
						row={row}
						setRow={setRow}
					/>
				)}

				<Submit />
			</Form>
		</>
	);
}
