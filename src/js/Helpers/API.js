import Jsona from 'jsona';
import { trackPromise } from 'react-promise-tracker';

export default class API {
	static get(url) {
		return API.request('GET', url);
	}

	static delete(url) {
		return API.request('DELETE', url);
	}

	static post(url) {
		return API.request('POST', url);
	}

	static put(url) {
		return API.request('PUT', url);
	}

	static request(method, url) {
		const options = {
			method,
		};

		return trackPromise(
			fetch(`${process.env.REACT_APP_API_URL}/${url}`, options)
				.then(response => (response.json()))
				.then(response => (new Jsona().deserialize(response)))
		);
	}
}
