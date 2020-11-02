import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Footer() {
	return (
		<footer id="footer">
			<nav id="nav">
				<NavLink activeClassName="active" className="nav__link" exact to="/">New Event</NavLink>
				<NavLink activeClassName="active" className="nav__link" to="/events">Past Events</NavLink>
				<NavLink activeClassName="active" className="nav__link" to="/event-types">Event Types</NavLink>
				<NavLink activeClassName="active" className="nav__link" to="/profile">Profile</NavLink>
			</nav>
		</footer>
	);
}
