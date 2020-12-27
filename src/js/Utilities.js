export const getEventLabel = (event) => { // eslint-disable-line import/prefer-default-export
	let label = event.action_type.label;
	if (event.value) {
		let value = event.value;
		if (event.action_type.suffix) {
			value += ` ${event.action_type.suffix}`;
		}
		label += ` (${value})`;
	} else if (event.option) {
		label += ` (${event.option.label})`;
	}
	return label;
};
