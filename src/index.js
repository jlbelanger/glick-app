import './scss/style.scss';
import App from './js/App';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
