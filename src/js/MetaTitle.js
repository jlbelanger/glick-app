import PropTypes from 'prop-types';
import React from 'react';

export default class MetaTitle extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	}

	static defaultProps = {
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
		const defaultTitle = '212 Green';
		let title = this.props.title;
		if (title) {
			title += ' | ';
		}
		title += defaultTitle;
		document.querySelector('title').innerText = title;
	}

	render() {
		return null;
	}
}
