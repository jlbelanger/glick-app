import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function MetaTitle({ hideTitleText, title }) {
	useEffect(() => {
		let metaTitle = title;
		if (process.env.REACT_APP_TITLE) {
			if (metaTitle) {
				metaTitle += ' | ';
			}
			metaTitle += process.env.REACT_APP_TITLE;
		}
		document.querySelector('title').innerText = metaTitle;

		const elem = document.getElementById('title__text');
		elem.innerText = title;
		if (metaTitle && !hideTitleText) {
			elem.style.display = '';
		} else {
			elem.style.display = 'none';
		}
	}, [title]);

	return null;
}

MetaTitle.propTypes = {
	hideTitleText: PropTypes.bool,
	title: PropTypes.string,
};

MetaTitle.defaultProps = {
	hideTitleText: false,
	title: '',
};
