import { Form, Submit } from '@jlbelanger/formosa';
import Fields from './Partials/Fields';
import MetaTitle from '../../MetaTitle';
import React from 'react';

export default function New() {
	return (
		<>
			<MetaTitle title="Add new event type" />

			<Form
				path="action-types"
				method="POST"
				relationshipNames={['options']}
				redirectOnSuccess="/"
				warnOnUnload
			>
				<Fields />
				<Submit />
			</Form>
		</>
	);
}
