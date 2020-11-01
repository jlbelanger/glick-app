import {
	Route,
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom';
import EventList from './Pages/EventList';
import EventTypeEdit from './Pages/EventTypeEdit';
import EventTypeList from './Pages/EventTypeList';
import EventTypeNew from './Pages/EventTypeNew';
import Footer from './Footer';
import Header from './Header';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
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
						<Route path="/event-types/new">
							<EventTypeNew />
						</Route>
						<Route path="/event-types/:id">
							<EventTypeEdit />
						</Route>
						<Route path="/events">
							<EventList />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
					</Switch>
				</article>

				<Spinner />
			</main>
		</Router>
	);
}
