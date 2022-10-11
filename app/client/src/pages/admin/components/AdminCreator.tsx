import { userCreateValidation } from '@blog/backend/validation/user';
import { Button, Card, Form } from '@blog/components/core';
import { useModal } from '@blog/components/modal';
import { toFormikValidationSchema } from '@blog/utils/client';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCreateFirstUserMutation } from 'src/trpc-hooks';

export function AdminCreator() {
	const navigate = useNavigate();
	const createAdmin = useCreateFirstUserMutation();
	const { modalUpdate, modalToggle } = useModal();

	const { handleSubmit, getFieldProps, errors } = useFormik({
		initialValues: {
			username: '',
			email: '',
			firstname: '',
			lastname: '',
			password: ''
		},
		validationSchema: toFormikValidationSchema(userCreateValidation),
		onSubmit(values) {
			createAdmin.mutate(values, {
				onSuccess(values) {
					modalUpdate({
						title: 'Success!',
						content: (
							<>
								<p>Your first user has been created!</p>
								<p>
									Please log in with your new username{' '}
									<code>{values.username}</code>!
								</p>
							</>
						),
						footer: (
							<div className="flex gap-4">
								<Button.Success
									onClick={() => {
										navigate('/login');
										modalToggle(false);
									}}
								>
									Ok
								</Button.Success>
							</div>
						),
						onDismiss() {
							navigate('/login');
							modalToggle(false);
						}
					});

					modalToggle(true);
				}
			});
		}
	});

	return (
		<Card className="p-4">
			<Form.Body onSubmit={handleSubmit}>
				<Form.Input
					label="Username"
					type="text"
					{...getFieldProps('username')}
					error={errors.username}
					required
				/>
				<Form.Input
					label="Email"
					type="email"
					{...getFieldProps('email')}
					error={errors.email}
					required
				/>
				<Form.Input
					label="Firstname"
					type="text"
					{...getFieldProps('firstname')}
					error={errors.firstname}
					required
				/>
				<Form.Input
					label="Lastname"
					type="text"
					{...getFieldProps('lastname')}
					error={errors.lastname}
					required
				/>
				<Form.Input
					label="Password"
					type="password"
					{...getFieldProps('password')}
					error={errors.password}
					required
				/>
				<Form.Section>
					<Button.Success type="submit">Create</Button.Success>
				</Form.Section>
			</Form.Body>
		</Card>
	);
}
