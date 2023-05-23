import Auth from './Auth';

export const errorMessageText = (response, logout = true) => {
	if (logout && response.status === 401) {
		return Auth.logout(response.status);
	}
	return `Error: ${response.errors.map((e) => (e.title)).join(' ')}`;
};

export const afterSubmitFailure = (error) => {
	if (error.status === 401) {
		Auth.logout(error.status);
	}
};
