import { Api, FormosaContext } from '@jlbelanger/formosa';
import { NavLink, useLocation } from 'react-router-dom';
import React, { useContext } from 'react';
import Auth from './Utilities/Auth';
import { ReactComponent as Logo } from '../svg/logo.svg';

export default function Header() {
	const { addToast } = useContext(FormosaContext);
	const location = useLocation();

	const logout = () => {
		Api.delete('auth/logout')
			.then(() => {
				Auth.logout();
			})
			.catch((response) => {
				if (response.status === 401 || response.status === 404) {
					Auth.logout();
					return;
				}
				addToast('Error.', 'error');
			});
	};

	return (
		<header id="header">
			<div className="contain" id="header__contain">
				{Auth.isLoggedIn() && <NavLink activeClassName="nav__link--active" className="nav__link" to="/profile">Profile</NavLink>}
				<div id="logo"><Logo height="28" fill="#fff" title={process.env.REACT_APP_TITLE} /></div>
				{Auth.isLoggedIn() && (
					<button className="nav__button" disabled={location.pathname !== '/profile'} onClick={logout} type="button">Logout</button>
				)}
			</div>
		</header>
	);
}
