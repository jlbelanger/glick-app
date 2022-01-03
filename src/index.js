import './scss/style.scss';
import App from './js/App';
import React from 'react';
import ReactDOM from 'react-dom';

function gtag() {
	window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
	window.dataLayer = window.dataLayer || [];
	gtag('js', new Date());
	gtag('config', process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
