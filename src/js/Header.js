import { Api, FormosaContext } from '@jlbelanger/formosa';
import React, { useContext } from 'react';
import Auth from './Utilities/Auth';
import { ReactComponent as Logo } from '../svg/logo.svg';
import { NavLink } from 'react-router-dom';

export default function Header() {
	const { formosaState } = useContext(FormosaContext);
	const logout = () => {
		Api.delete('auth/logout')
			.then(() => {
				Auth.logout();
			})
			.catch(() => {
				formosaState.addToast('Error.', 'error');
			});
	};

	return (
		<header id="header">
			<div className="contain" id="header__contain">
				{Auth.isLoggedIn() && <NavLink activeClassName="nav__link--active" className="nav__link" to="/profile">Profile</NavLink>}
				<h1><Logo height="28" fill="#fff" title={process.env.REACT_APP_TITLE} /></h1>
				{Auth.isLoggedIn() && <button className="nav__button" onClick={logout} type="button">Logout</button>}
			</div>
		</header>
	);
}
