import { Button, Card, Form, RequireAuth } from '@blog/components/core';
import { useLogin } from '@blog/components/hooks';
import { toFormikValidationSchema } from '@blog/utils/client';
import { useFormik } from 'formik';
import { useRef } from 'react';
import z from 'zod';

export function LoginForm() {
	const [login, error] = useLogin();
	const hcaptchaRef = useRef(null);

	const { handleSubmit, getFieldProps, setFieldValue, errors } = useFormik({
		initialValues: {
			username: '',
			password: '',
			captchaToken: ''
		},
		validationSchema: toFormikValidationSchema(
			z.object({
				username: z.string(),
				password: z.string(),
				captchaToken: z.string()
			})
		),
		onSubmit: login
	});

	return (
		<RequireAuth mode={false} fallback={<p>You are already logged in!</p>}>
			<Card className="p-4">
				<Form.Body onSubmit={handleSubmit} className="grid gap-4">
					<Form.Input
						label="Username"
						type="text"
						{...getFieldProps('username')}
						error={errors.username}
						required
					/>
					<Form.Input
						label="Password"
						type="password"
						{...getFieldProps('password')}
						error={errors.password}
						required
					/>
					<Form.Captcha
						onVerify={(token: string) => {
							setFieldValue('captchaToken', token);
						}}
						ref={hcaptchaRef}
						error={errors.captchaToken}
					/>
					<Form.Section>
						<Button.Success type="submit">Login</Button.Success>
					</Form.Section>
				</Form.Body>
				{error && <p>{error}</p>}
			</Card>
		</RequireAuth>
	);
}
