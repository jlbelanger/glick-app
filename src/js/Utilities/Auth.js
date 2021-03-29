import Cookies from 'js-cookie';

export default class Auth {
	static login(id, token, remember) {
		Cookies.set('glick_id', id, Auth.attributes(remember));
		Cookies.set('glick_token', token, Auth.attributes(remember));
	}

	static attributes(remember) {
		const attributes = {};
		if (remember) {
			attributes.expires = 365;
		}
		if (window.location.protocol === 'https:') {
			attributes.secure = true;
		}
		return attributes;
	}

	static logout() {
		Cookies.remove('glick_id');
		Cookies.remove('glick_token');
		window.location.href = window.location.href.replace(window.location.hash, '');
	}

	static id() {
		return Cookies.get('glick_id');
	}

	static token() {
		return Cookies.get('glick_token');
	}

	static isLoggedIn() {
		return !!Auth.id() && !!Auth.token();
	}
}
