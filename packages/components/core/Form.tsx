import React from 'react';

export const Form = {} as Record<'Input', React.ElementType>;

type InputProps = {
	label: React.ReactNode;
} & React.HTMLAttributes<HTMLInputElement>;

Form.Input = function ({ label, ...props }: InputProps) {
	return (
		<label>
			<div>{label}</div>
			<input {...props} />
		</label>
	);
};
