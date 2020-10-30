import Field from './Log/Field';
import Footer from './Footer';
import Header from './Header';
import Jsona from 'jsona';
import Label from './Log/Label';
import React from 'react';
import Spinner from './Spinner';
import { trackPromise } from 'react-promise-tracker';

export default class App extends React.Component {
	state = {
		actionTypes: [],
	}

	componentDidMount() {
		trackPromise(
			fetch(`${process.env.REACT_APP_API_URL}/action-types`)
				.then(response => (response.json()))
				.then(response => (new Jsona().deserialize(response)))
				.then((actionTypes) => {
					this.setState({ actionTypes });
				})
		);
	}

	onSubmit = (e) => {
		e.preventDefault();
	}

	render() {
		return (
			<main id="main">
				<Header />
				<Footer />

				<article id="article">
					<ul id="list">
						{this.state.actionTypes.map(actionType => (
							<li key={actionType.id}>
								<form action={`${process.env.REACT_APP_API_URL}/actions`} method="POST" onSubmit={this.onSubmit}>
									<Label actionType={actionType} />
									<Field actionType={actionType} />
								</form>
							</li>
						))}
					</ul>
				</article>

				<Spinner />
			</main>
		);
	}
}
