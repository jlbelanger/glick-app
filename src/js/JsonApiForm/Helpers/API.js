import Auth from '../../Utilities/Auth';
import Jsona from 'jsona';
import { trackPromise } from 'react-promise-tracker';

export default class API {
	static get(url) {
		return API.request('GET', url);
	}

	static delete(url) {
		return API.request('DELETE', url);
	}

	static post(url, body) {
		return API.request('POST', url, body);
	}

	static put(url, body) {
		return API.request('PUT', url, body);
	}

	static request(method, url, body = null) {
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		if (Auth.token()) {
			options.headers.Authorization = `Bearer ${Auth.token()}`;
		}
		if (body) {
			options.body = body;
		}

		return trackPromise(
			fetch(`${process.env.REACT_APP_API_URL}/${url}`, options)
				.then((response) => {
					if (!response.ok) {
						return response.json()
							.then((json) => {
								json.status = response.status;
								throw json;
							})
							.catch((error) => {
								if (error instanceof SyntaxError) {
									throw { // eslint-disable-line no-throw-literal
										errors: [
											{
												title: 'The server returned invalid JSON.',
												status: '500',
											},
										],
										status: 500,
									};
								} else {
									throw error;
								}
							});
					}
					if (response.status === 204) {
						return {};
					}
					return response.json();
				})
				.then((json) => {
					if (Object.prototype.hasOwnProperty.call(json, 'data')) {
						return new Jsona().deserialize(json);
					}
					return json;
				})
		);
	}
}
