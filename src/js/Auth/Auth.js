import Cookies from 'js-cookie';

export default class Auth {
	static login(id, token) {
		Cookies.set('id', id, Auth.attributes());
		Cookies.set('token', token, Auth.attributes());
	}

	static attributes() {
		return window.location.protocol === 'https:' ? { secure: true } : {};
	}

	static logout() {
		Cookies.remove('id');
		Cookies.remove('token');
		window.location.href = window.location.href.replace(window.location.hash, '');
	}

	static id() {
		return Cookies.get('id');
	}

	static token() {
		return Cookies.get('token');
	}

	static isLoggedIn() {
		return !!Auth.id() && !!Auth.token();
	}
}
