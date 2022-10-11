import { userCreateValidation } from '@blog/backend/validation/user';
import { Button, Card, Form } from '@blog/components/core';
import { useFormik } from 'formik';
import { useCreateUserMutation } from 'src/trpc-hooks';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export function SignupForm() {
	const createUserMutation = useCreateUserMutation();
	const { handleSubmit, getFieldProps, errors } = useFormik({
		initialValues: {
			username: '',
			email: '',
			firstname: '',
			lastname: '',
			password: '',
			captchaToken: ''
		},
		validationSchema: toFormikValidationSchema(userCreateValidation),
		onSubmit(values) {
			createUserMutation.mutateAsync(values);
		}
	});

	return (
		<Card className="p-4">
			<h2>Create your new account!</h2>
			<p>
				Thanks for choosing to create an account. Just fill in the info below, and you're
				off!
			</p>

			<Form.Body onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
				<Form.Section className="flex-1">
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
						label="Password"
						type="password"
						{...getFieldProps('password')}
						error={errors.password}
						required
					/>
				</Form.Section>
				<Form.Section className="flex-1">
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
				</Form.Section>
				<Form.Section className="w-full">
					<Form.Captcha />
					(you can skip this btw, captcha support coming later)
				</Form.Section>
				<Form.Section className="w-full">
					<Button.Success type="submit">Create</Button.Success>
				</Form.Section>
			</Form.Body>
		</Card>
	);
}
