import { Api } from '@jlbelanger/formosa';
import Auth from './Utilities/Auth';
import { ReactComponent as Logo } from '../svg/logo.svg';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Header() {
	const logout = () => {
		Api.delete('auth/logout')
			.then(() => {
				Auth.logout();
			})
			.catch(() => {
				// toast.error('Error.'); // TODO
			});
	};

	return (
		<header id="header">
			<div className="contain" id="header__contain">
				{Auth.isLoggedIn() && <NavLink activeClassName="nav__link--active" className="nav__link" to="/profile">Profile</NavLink>}
				<h1><Logo height="28" fill="#fff" title="Glick" /></h1>
				{Auth.isLoggedIn() && <button className="nav__button" onClick={logout} type="button">Logout</button>}
			</div>
		</header>
	);
}
