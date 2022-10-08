import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { forwardRef } from 'react';

export const Form = {} as Record<
	'Input' | 'Body' | 'Captcha' | 'Section' | 'Textarea',
	React.ElementType
>;

type FormProps = React.ComponentProps<'form'>;

Form.Body = function ({ ...props }: FormProps) {
	return <form className="grid gap-4" {...props} />;
};

type InputProps = {
	label: string;
	required?: boolean;
	error?: string;
} & React.ComponentProps<'input'>;

Form.Input = function ({ label, required = false, error, ...props }: InputProps) {
	return (
		<label className="inline-grid grid-flow-row" htmlFor={props.name}>
			<div>
				{label}
				{required ? <small className="text-red-500">* </small> : ' '}
				{error && (
					<small className="text-red-500">
						<FontAwesomeIcon icon={faExclamationCircle} /> {error}
					</small>
				)}
			</div>
			<div className="flex gap-2 items-center">
				<input className={`${error ? 'bg-red-50' : 'bg-white'}`} {...props} />
			</div>
		</label>
	);
};

type CaptchaProps = {
	error?: string;
} & Omit<React.ComponentProps<typeof HCaptcha>, 'sitekey'>;

Form.Captcha = forwardRef<null, CaptchaProps>(function ({ error, ...props }, ref) {
	return (
		<div className="grid items-center">
			<div>
				Captcha<small className="text-red-500">*</small>{' '}
				{error && (
					<small className="text-red-500">
						<FontAwesomeIcon icon={faExclamationCircle} /> {error}
					</small>
				)}
			</div>
			<HCaptcha sitekey={process.env.HCAPTCHA_SITEKEY!} ref={ref} {...props} />
		</div>
	);
});

type SectionProps = React.ComponentProps<'div'>;

Form.Section = function (props: SectionProps) {
	return <div {...props} />;
};

type TextareaProps = {
	error?: string;
} & React.ComponentProps<'textarea'>;

Form.Textarea = function ({ error, ...props }: TextareaProps) {
	return (
		<div>
			<textarea {...props} />
			{error && (
				<small className="text-red-500">
					<FontAwesomeIcon icon={faExclamationCircle} /> {error}
				</small>
			)}
		</div>
	);
};
