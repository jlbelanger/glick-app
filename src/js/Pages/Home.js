import API from '../Helpers/API';
import Field from '../Log/Field';
import Label from '../Log/Label';
import React from 'react';

export default class Home extends React.Component {
	state = {
		actionTypes: [],
	}

	componentDidMount() {
		API.get('action-types')
			.then((actionTypes) => {
				this.setState({ actionTypes });
			});
	}

	onSubmit = (e) => {
		e.preventDefault();
	}

	render() {
		return (
			<ul className="list" id="list">
				{this.state.actionTypes.map(actionType => (
					<li className="list__item" key={actionType.id}>
						<form
							action={`${process.env.REACT_APP_API_URL}/actions`}
							method="POST"
							onSubmit={this.onSubmit}
						>
							<Label actionType={actionType} />
							<Field actionType={actionType} />
						</form>
					</li>
				))}
			</ul>
		);
	}
}
