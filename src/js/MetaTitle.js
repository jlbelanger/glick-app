import PropTypes from 'prop-types';
import React from 'react';

export default class MetaTitle extends React.Component {
	static propTypes = {
		hideTitleText: PropTypes.bool,
		title: PropTypes.string,
	};

	static defaultProps = {
		hideTitleText: false,
		title: '',
	};

	componentDidMount() {
		this.setTitle();
	}

	componentDidUpdate(prevProps) {
		if (this.props.title !== prevProps.title) {
			this.setTitle();
		}
	}

	setTitle() {
		const defaultTitle = process.env.REACT_APP_TITLE;
		let title = this.props.title;
		if (title) {
			title += ' | ';
		}
		title += defaultTitle;
		document.querySelector('title').innerText = title;

		const elem = document.getElementById('title__text');
		elem.innerText = this.props.title;
		if (this.props.title && !this.props.hideTitleText) {
			elem.style.display = '';
		} else {
			elem.style.display = 'none';
		}
	}

	render() {
		return null;
	}
}
