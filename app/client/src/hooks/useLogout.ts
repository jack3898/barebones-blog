import { useCallback, useState } from 'react';

const server = process.env.SERVER_ORIGIN!;

export function useLogout() {
	const [error, setError] = useState<string | null>(null);

	const logout = useCallback((onSuccess?: () => void) => {
		fetch(`${server}/auth`, {
			method: 'DELETE',
			credentials: 'include'
		}).then((res) => {
			if (res.status === 200) return void onSuccess?.();

			setError('Unable to log out');
		});
	}, []);

	return [logout, error] as const;
}
