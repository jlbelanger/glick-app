import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Auth from './Utilities/Auth';
import EventEdit from './Pages/Events/Edit';
import EventList from './Pages/Events/List';
import EventNew from './Pages/Events/New';
import EventTypeEdit from './Pages/EventTypes/Edit';
import EventTypeList from './Pages/EventTypes/List';
import EventTypeNew from './Pages/EventTypes/New';
import Footer from './Footer';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Header from './Header';
import Login from './Pages/Auth/Login';
import Profile from './Pages/Users/Edit';
import React from 'react';
import Register from './Pages/Auth/Register';
import ResetPassword from './Pages/Auth/ResetPassword';
import Spinner from './Spinner';

export default function App() {
	return (
		<BrowserRouter>
			<main id="main">
				<Header />
				<h2 id="title">
					<span className="contain" id="title__text" style={{ display: 'none' }} />
				</h2>
				<Footer />

				<article className="contain" id="article">
					<Switch>
						<Route exact path="/">
							{Auth.isLoggedIn() ? <EventNew /> : <Login />}
						</Route>
						<Route exact path="/register">
							{Auth.isLoggedIn() ? <Redirect to="/" /> : <Register />}
						</Route>
						<Route exact path="/forgot-password">
							{Auth.isLoggedIn() ? <Redirect to="/" /> : <ForgotPassword />}
						</Route>
						<Route exact path="/reset-password/:token">
							{Auth.isLoggedIn() ? <Redirect to="/" /> : <ResetPassword />}
						</Route>
						<Route exact path="/event-types">
							{Auth.isLoggedIn() ? <EventTypeList /> : <Redirect to="/" />}
						</Route>
						<Route exact path="/event-types/new">
							{Auth.isLoggedIn() ? <EventTypeNew /> : <Redirect to="/" />}
						</Route>
						<Route path="/event-types/:id">
							{Auth.isLoggedIn() ? <EventTypeEdit /> : <Redirect to="/" />}
						</Route>
						<Route exact path="/events">
							{Auth.isLoggedIn() ? <EventList /> : <Redirect to="/" />}
						</Route>
						<Route path="/events/:id">
							{Auth.isLoggedIn() ? <EventEdit /> : <Redirect to="/" />}
						</Route>
						<Route exact path="/profile">
							{Auth.isLoggedIn() ? <Profile /> : <Redirect to="/" />}
						</Route>
					</Switch>
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
