import { Button, Card, Form, RequireAuth } from '@blog/components/core';
import { useLogin } from '@blog/components/hooks';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useFormik } from 'formik';
import { useRef } from 'react';

export function LoginForm() {
	const [login, error] = useLogin();
	const hcaptchaRef = useRef(null);

	const { handleSubmit, getFieldProps, setFieldValue } = useFormik({
		initialValues: {
			username: '',
			password: '',
			captchaToken: ''
		},
		onSubmit: async (values) => {
			login(values);
		}
	});

	return (
		<RequireAuth mode={false} fallback={<p>You are already logged in!</p>}>
			<Card className="p-4">
				<form onSubmit={handleSubmit} className="grid gap-4">
					<Form.Input label="Username:" type="text" {...getFieldProps('username')} />
					<Form.Input label="Password:" type="password" {...getFieldProps('password')} />
					<HCaptcha
						sitekey={process.env.HCAPTCHA_SITEKEY!}
						onVerify={(token) => {
							setFieldValue('captchaToken', token);
						}}
						ref={hcaptchaRef}
					/>
					<div>
						<Button.Success type="submit">Login</Button.Success>
					</div>
				</form>
				{error && <p>{error}</p>}
			</Card>
		</RequireAuth>
	);
}
