import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Auth from './Auth/Auth';
import EventEdit from './Pages/Events/Edit';
import EventList from './Pages/Events/List';
import EventTypeEdit from './Pages/EventTypes/Edit';
import EventTypeList from './Pages/EventTypes/List';
import EventTypeNew from './Pages/EventTypes/New';
import Footer from './Footer';
import Header from './Header';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Profile from './Pages/Users/Edit';
import React from 'react';
import Register from './Pages/Auth/Register';
import Spinner from './Spinner';

export default function App() {
	return (
		<BrowserRouter>
			<main id="main">
				<Header />
				<Footer />

				<article className="contain" id="article">
					<Switch>
						<Route exact path="/">
							{Auth.isLoggedIn() ? <Home /> : <Login />}
						</Route>
						<Route exact path="/register">
							{Auth.isLoggedIn() ? <Redirect to="/" /> : <Register />}
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
						<Route exact path="/events/:id">
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
