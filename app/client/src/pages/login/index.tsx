import { Container } from '@blog/components/core';
import { useAuthContext } from 'src/Context/auth';
import { LoggedInFlow } from './components/LoggedInFlow';
import { LoggedOutFlow } from './components/LoggedOutFlow';

export default function Login() {
	const { loggedInUser } = useAuthContext();

	return (
		<Container className="grid gap-8 px-4">
			{loggedInUser ? <LoggedInFlow /> : <LoggedOutFlow />}
		</Container>
	);
}
