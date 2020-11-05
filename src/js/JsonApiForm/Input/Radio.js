import React, { useContext } from 'react';
import FormContext from '../FormContext';
import PropTypes from 'prop-types';

export default function Radio({
	name,
	options,
	required,
}) {
	const { formState, setFormState } = useContext(FormContext);
	const onChange = (e) => {
		const newDirty = [...formState.dirty];
		if (!newDirty.includes(e.target.name)) {
			newDirty.push(e.target.name);
		}
		setFormState({
			...formState,
			dirty: newDirty,
			row: {
				...formState.row,
				[e.target.name]: e.target.value,
			},
		});
	};
	const keys = Object.keys(options);
	const numKeys = keys.length;

	return (
		<ul className="radio">
			{keys.map((value, i) => {
				const checked = formState.row[name] === value;
				let className = 'infix';
				if (i === 0) {
					className = 'prefix';
				} else if (i === numKeys - 1) {
					className = 'postfix';
				}
				return (
					<li className="radio__item" key={value}>
						<label className={`radio__label button ${className}${checked ? ' active' : ''}`}>
							<input
								className={`field__input radio__input ${className}`.trim()}
								checked={checked}
								name={name}
								onChange={onChange}
								required={required}
								type="radio"
								value={value}
							/>
							{options[value]}
						</label>
					</li>
				);
			})}
		</ul>
	);
}

Radio.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.object.isRequired,
	required: PropTypes.bool,
};

Radio.defaultProps = {
	required: false,
};
