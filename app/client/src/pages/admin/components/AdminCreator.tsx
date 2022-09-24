import { Card } from '@blog/components/core';
import { useFormik } from 'formik';
import { useCreateFirstUserMutation } from 'src/trpc-hooks';

export function AdminCreator() {
	const createAdmin = useCreateFirstUserMutation();

	const { handleSubmit, getFieldProps } = useFormik({
		initialValues: {
			username: '',
			email: '',
			firstname: '',
			lastname: '',
			password: ''
		},
		onSubmit(values) {
			createAdmin.mutate(values);
		}
	});

	return (
		<Card className="p-4">
			<form className="grid gap-4" onSubmit={handleSubmit}>
				<label>
					<div>Username</div>
					<input type="text" {...getFieldProps('username')} />
				</label>
				<label>
					<div>Email</div>
					<input type="email" {...getFieldProps('email')} />
				</label>
				<label>
					<div>Firstname</div>
					<input type="text" {...getFieldProps('firstname')} />
				</label>
				<label>
					<div>Lastname</div>
					<input type="text" {...getFieldProps('lastname')} />
				</label>
				<label>
					<div>Password</div>
					<input type="password" {...getFieldProps('password')} />
				</label>
				<div>
					<button type="submit" className="primary">
						Create
					</button>
				</div>
			</form>
		</Card>
	);
}
