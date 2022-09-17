import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

const server = process.env.SERVER_ORIGIN!;

export function LoggedOutFlow() {
	const navigate = useNavigate();

	const { handleSubmit, getFieldProps } = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		onSubmit: async (values) => {
			fetch(`${server}/auth`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(values)
			});

			navigate('/');
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
			<Link to="/">Home</Link>
		</>
	);
}
