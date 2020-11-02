import React, { useEffect, useState } from 'react';
import API from '../JsonApiForm/Helpers/API';
import Field from '../Log/Field';
import Form from '../JsonApiForm/Form';
import Label from '../Log/Label';

export default function Home() {
	const [rows, setRows] = useState(null);
	useEffect(() => {
		if (rows === null) {
			API.get('action-types')
				.then((response) => {
					setRows(response);
				});
		}
		return () => {};
	});

	if (rows === null) {
		return null;
	}

	return (
		<ul className="list" id="list">
			{rows.map((row) => {
				const defaultRow = {
					action_type: {
						id: row.id,
						type: 'action_types',
					},
				};
				return (
					<li className="list__item" key={row.id}>
						<Form path="actions" method="POST" relationshipNames={['action_type']} row={defaultRow}>
							<Label actionType={row} />
							<Field actionType={row} />
						</Form>
					</li>
				);
			})}
		</ul>
	);
}
