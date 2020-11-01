import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Footer() {
	return (
		<footer id="footer">
			<nav className="nav" id="footer__nav">
				<NavLink activeClassName="active" exact to="/">New Event</NavLink>
				<NavLink activeClassName="active" to="/events">Past Events</NavLink>
				<NavLink activeClassName="active" to="/event-types">Event Types</NavLink>
				<NavLink activeClassName="active" to="/profile">Profile</NavLink>
			</nav>
		</footer>
	);
}
