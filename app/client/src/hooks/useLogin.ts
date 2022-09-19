import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const server = process.env.SERVER_ORIGIN!;

type LoginData = {
	username: string;
	password: string;
};

export function useLogin() {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const login = useCallback((loginData: LoginData) => {
		// TODO: Add abort controller in a custom fetch hook abstraction
		fetch(`${server}/auth`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(loginData)
		}).then((res) => {
			if (res.status === 200) {
				navigate('/');
				window.location.reload();
			}

			setError('Incorrect username or password');
		});
	}, []);

	return [login, error] as const;
}
