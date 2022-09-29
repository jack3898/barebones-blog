import { clientEnvironment } from '@blog/utils/both/httpenv/client';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../context';

const { backendPort, backendAddress, backendEndpoint } = clientEnvironment;

const server = `${backendAddress}:${backendPort}${backendEndpoint}`;

type LoginData = {
	username: string;
	password: string;
};

export function useLogin() {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const trpcUtils = trpc.useContext();

	const login = useCallback((loginData: LoginData) => {
		// TODO: Add abort controller in a custom fetch hook abstraction
		fetch(`${server}/auth`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(loginData)
		}).then((res) => {
			if (res.status === 200) {
				trpcUtils.fetchQuery(['user.loggedin']);
				navigate('/');
			}

			setError('Incorrect username or password');
		});
	}, []);

	return [login, error] as const;
}
