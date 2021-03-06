import { Slide, ToastContainer } from 'react-toastify';
import { Api } from '@jlbelanger/formosa';
import Auth from './Utilities/Auth';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import React from 'react';
import Routes from './Routes';
import Spinner from './Spinner';

export default function App() {
	if (Auth.isLoggedIn() && !Api.getToken()) {
		Api.setToken(Auth.token());
	}

	return (
		<BrowserRouter>
			<main id="main">
				<Header />
				<h2 id="title">
					<span className="contain" id="title__text" style={{ display: 'none' }} />
				</h2>
				<Footer />

				<article className="contain" id="article">
					<Routes />
				</article>

				<ToastContainer
					autoClose={3000}
					draggable={false}
					hideProgressBar
					transition={Slide}
				/>
				<Spinner />
			</main>
		</BrowserRouter>
	);
}
