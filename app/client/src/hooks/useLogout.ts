import { trpc } from '@blog/components/trpc';
import { clientEnvironment } from '@blog/utils/both/httpenv/client';
import { useCallback, useState } from 'react';

const { backendPort, backendAddress, backendEndpoint } = clientEnvironment;

const server = `${backendAddress}:${backendPort}${backendEndpoint}`;

export function useLogout() {
	const [error, setError] = useState<string | null>(null);
	const trpcUtils = trpc.useContext();

	const logout = useCallback((onSuccess?: () => void) => {
		fetch(`${server}/auth`, {
			method: 'DELETE',
			credentials: 'include'
		}).then((res) => {
			if (res.status === 200) {
				onSuccess?.();
				trpcUtils.setQueryData(['user.loggedin'], null);

				return;
			}

			setError('Unable to log out');
		});
	}, []);

	return [logout, error] as const;
}
