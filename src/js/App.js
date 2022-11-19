import { Api, FormContainer } from '@jlbelanger/formosa';
import Auth from './Utilities/Auth';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import React from 'react';
import Routes from './Routes';

export default function App() {
	if (Auth.isLoggedIn() && !Api.getToken()) {
		Api.setToken(Auth.token());
	}

	document.addEventListener('formosaApiRequest', () => {
		Auth.refresh();
	});

	return (
		<BrowserRouter>
			<main id="main">
				<FormContainer>
					<Header />
					<h1 id="title">
						<span className="contain" id="title__text" style={{ display: 'none' }} />
					</h1>
					<Footer />

					<article className="contain" id="article">
						<Routes />
					</article>
				</FormContainer>
			</main>
		</BrowserRouter>
	);
}
