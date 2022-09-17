import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const server = process.env.SERVER_ORIGIN!;

export default function Login() {
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
		}
	});

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Username: <input type="text" {...getFieldProps('username')} />
				</label>
				<br />
				<label>
					Password:
					<input type="password" {...getFieldProps('password')} />
				</label>
				<br />
				<button type="submit">Login</button>
			</form>
			<Link to="/">Home</Link>
		</>
	);
}
