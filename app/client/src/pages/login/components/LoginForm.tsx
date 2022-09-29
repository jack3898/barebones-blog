import { Button, Card, Form, RequireAuth } from '@blog/components/core';
import { useLogin } from '@blog/components/hooks';
import { useFormik } from 'formik';

export function LoginForm() {
	const [login, error] = useLogin();

	const { handleSubmit, getFieldProps } = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		onSubmit: async (values) => {
			login(values);
		}
	});

	return (
		<RequireAuth mode={false} fallback={<p>You are already logged in!</p>}>
			<Card className="p-4">
				<form onSubmit={handleSubmit} className="grid gap-4">
					<Form.Input label="Username:" type="text" {...getFieldProps('username')} />
					<Form.Input label="Password:" type="password" {...getFieldProps('password')} />
					<div>
						<Button.Success type="submit">Login</Button.Success>
					</div>
				</form>
				{error && <p>{error}</p>}
			</Card>
		</RequireAuth>
	);
}
