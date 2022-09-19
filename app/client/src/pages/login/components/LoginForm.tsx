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
				<form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow grid gap-4">
					<label>
						<div>Username:</div>
						<input type="text" {...getFieldProps('username')} />
					</label>
					<label>
						<div>Password:</div>
						<input type="password" {...getFieldProps('password')} />
					</label>
					<div>
						<button type="submit">Login</button>
					</div>
				</form>
				{error && <p>{error}</p>}
			</RequireAuth>
			<Link to="/">Home</Link>
		</>
	);
}
