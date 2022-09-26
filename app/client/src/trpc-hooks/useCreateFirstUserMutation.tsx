import { trpc } from '@blog/components/context';
import { useNavigate } from 'react-router-dom';

export function useCreateFirstUserMutation() {
	const navigate = useNavigate();

	return trpc.useMutation(['user.createfirst'], {
		onSuccess({ username }) {
			alert(`New user created! Please sign in with your new username: ${username}.`);
			navigate('/login');
		}
	});
}
