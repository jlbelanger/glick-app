import {
	Route,
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import EventEdit from './Pages/Events/Edit';
import EventList from './Pages/Events/List';
import EventTypeEdit from './Pages/EventTypes/Edit';
import EventTypeList from './Pages/EventTypes/List';
import EventTypeNew from './Pages/EventTypes/New';
import Footer from './Footer';
import Header from './Header';
import Home from './Pages/Home';
import Profile from './Pages/Users/Edit';
import React from 'react';
import Spinner from './Spinner';

export default function App() {
	return (
		<Router>
			<main id="main">
				<Header />
				<Footer />

				<article id="article">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/event-types">
							<EventTypeList />
						</Route>
						<Route exact path="/event-types/new">
							<EventTypeNew />
						</Route>
						<Route path="/event-types/:id">
							<EventTypeEdit />
						</Route>
						<Route exact path="/events">
							<EventList />
						</Route>
						<Route exact path="/events/:id">
							<EventEdit />
						</Route>
						<Route exact path="/profile">
							<Profile />
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
		</Router>
	);
}
