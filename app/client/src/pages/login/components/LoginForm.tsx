import { Card } from '@blog/components/core';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { RequireAuth } from 'src/components';
import { useLogin, useLogout } from 'src/hooks';

export function LoginForm() {
	const [login, error] = useLogin();
	const [logout] = useLogout();

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
			<RequireAuth
				mode={false}
				fallback={
					<p>
						You are already logged in!{' '}
						<a href="#" onClick={() => logout(() => window.location.reload())}>
							Logout?
						</a>
					</p>
				}
			>
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
			<Link to="/">Home</Link>
		</>
	);
}
