import { Container } from '@blog/components/core';
import { LoginForm } from './components/LoginForm';

export default function Login() {
	return (
		<Container className="grid gap-8 px-4">
			<LoginForm />
		</Container>
	);
}
