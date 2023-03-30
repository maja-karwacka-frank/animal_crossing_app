import { useState, useCallback } from 'react';

export const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (url: string, callback: (data:[]) => void) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(url, {
				headers: {
					'X-API-KEY': 'fbf68304-bfe4-45d5-aec1-eb28ff35e963',
				},
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			console.log('pobrane');
			callback(data);
		} catch (err: any) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
	};
};
