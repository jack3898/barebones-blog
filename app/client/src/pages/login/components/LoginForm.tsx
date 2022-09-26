import { Card } from '@blog/components/core';
import { useLogin } from '@blog/components/hooks';
import { useFormik } from 'formik';
import { RequireAuth } from 'src/components';

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
		<>
			<h1>Login</h1>
			<RequireAuth mode={false} fallback={<p>You are already logged in!</p>}>
				<Card className="p-4">
					<form onSubmit={handleSubmit} className="grid gap-4">
						<label>
							<div>Username:</div>
							<input type="text" {...getFieldProps('username')} />
						</label>
						<label>
							<div>Password:</div>
							<input type="password" {...getFieldProps('password')} />
						</label>
						<div>
							<button type="submit" className="primary">
								Login
							</button>
						</div>
					</form>
					{error && <p>{error}</p>}
				</Card>
			</RequireAuth>
		</>
	);
}
