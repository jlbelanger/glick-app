import PropTypes from 'prop-types';
import React from 'react';

export default class MetaTitle extends React.Component {
	static propTypes = {
		hideTitleText: PropTypes.bool,
		title: PropTypes.string,
	}

	static defaultProps = {
		hideTitleText: false,
		title: '',
	}

	componentDidMount() {
		this.setTitle();
	}

	componentDidUpdate(prevProps) {
		if (this.props.title !== prevProps.title) {
			this.setTitle();
		}
	}

	setTitle() {
		const defaultTitle = 'Glick';
		let title = this.props.title;
		if (title) {
			title += ' | ';
		}
		title += defaultTitle;
		document.querySelector('title').innerText = title;

		const elem = document.getElementById('title__text');
		if (this.props.title && !this.props.hideTitleText) {
			elem.innerText = this.props.title;
			elem.style.display = '';
		} else {
			elem.style.display = 'none';
		}
	}

	render() {
		return null;
	}
}
