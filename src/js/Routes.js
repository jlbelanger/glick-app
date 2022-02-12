import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './Utilities/Auth';
import Error404 from './Error404';
import EventEdit from './Pages/Events/Edit';
import EventList from './Pages/Events/List';
import EventNew from './Pages/Events/New';
import EventTypeEdit from './Pages/EventTypes/Edit';
import EventTypeList from './Pages/EventTypes/List';
import EventTypeNew from './Pages/EventTypes/New';
import EventTypeView from './Pages/EventTypes/View';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Login from './Pages/Auth/Login';
import Profile from './Pages/Users/Edit';
import Register from './Pages/Auth/Register';
import ResetPassword from './Pages/Auth/ResetPassword';

export default function Routes() {
	return (
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

			<Route path="/event-types/:id/edit">
				{Auth.isLoggedIn() ? <EventTypeEdit /> : <Redirect to="/" />}
			</Route>

			<Route path="/event-types/:id">
				{Auth.isLoggedIn() ? <EventTypeView /> : <Redirect to="/" />}
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

			<Route component={Error404} />
		</Switch>
	);
}
