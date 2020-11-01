import PropTypes from 'prop-types';
import React from 'react';

export default function Radio({
	name,
	options,
	row,
	setRow,
}) {
	const onChange = (e) => {
		setRow({
			...row,
			[e.target.name]: e.target.value,
		});
	};
	const keys = Object.keys(options);
	const numKeys = keys.length;

	return (
		<ul className="radio">
			{keys.map((value, i) => {
				const checked = row[name] === value;
				let className = 'infix';
				if (i === 0) {
					className = 'prefix';
				} else if (i === numKeys - 1) {
					className = 'postfix';
				}
				if (checked) {
					className += ' active';
				}
				return (
					<li className="radio__item" key={value}>
						<label className={`radio__label button ${className}`}>
							<input
								className="radio__input"
								checked={checked}
								name={name}
								onChange={onChange}
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
	row: PropTypes.object.isRequired,
	setRow: PropTypes.func.isRequired,
};
