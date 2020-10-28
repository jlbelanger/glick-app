import React from 'react';

export default function App() {
	return (
		<main id="main">
			<header id="header">
				<nav className="nav" id="header__nav">
					<a href="/#/profile">Profile</a>
					<h1>212</h1>
					<a href="/#/types/new">New Type</a>
				</nav>
			</header>

			<footer id="footer">
				<nav className="nav" id="footer__nav">
					<a className="active" href="/#/">Log</a>
					<a href="/#/types">Types</a>
					<a href="/#/list">List</a>
				</nav>
			</footer>

			<article id="article">
				<ul id="list">
					<li className="active-item">
						<div>
							<label>Headache</label>
							<small>(since 8am)</small>
						</div>
						<div>
							<button className="active" type="button">Mild</button>
							<button type="button">Moderate</button>
							<button type="button">Severe</button>
							<button type="button">Stop</button>
						</div>
					</li>
					<li className="active-item">
						<div>
							<label>Sleep</label>
							<small>(since Mon. 10pm)</small>
						</div>
						<button type="button">Stop</button>
					</li>
					<li>
						<label htmlFor="weight">Weight</label>
						<div className="postfix-container">
							<div className="input-container">
								<input id="weight" type="text" />
								<span>lbs</span>
							</div>
							<button className="postfix" type="button">Add</button>
						</div>
					</li>
					<li>
						<label htmlFor="temperature">Temperature</label>
						<div className="postfix-container">
							<div className="input-container">
								<input id="temperature" type="text" />
								<span>&deg;C</span>
							</div>
							<button className="postfix" type="button">Add</button>
						</div>
					</li>
				</ul>
			</article>
		</main>
	);
}
