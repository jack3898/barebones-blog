import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const server = process.env.SERVER_ORIGIN!;

export function LoggedOutFlow() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const { handleSubmit, getFieldProps } = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		onSubmit: async (values) => {
			// TODO: Add abort controller in a custom fetch hook abstraction
			fetch(`${server}/auth`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(values)
			}).then((res) => {
				if (res.status === 200) return void navigate('/');

				setError('Incorrect username or password');
			});
		}
	});

	return (
		<>
			<h1>Login</h1>
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
			<Link to="/">Home</Link>
		</>
	);
}
