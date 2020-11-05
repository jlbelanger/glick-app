import React from 'react';

export default React.createContext(
	{
		dirty: [],
		errors: [],
		row: {},
	}
);
