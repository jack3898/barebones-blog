import React from 'react';

export const Button = {} as Record<'Primary' | 'Success' | 'Danger', React.ElementType>;

type ButtonProps = {
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

const commonStyle = ['rounded', 'px-4', 'py-2', 'text-white'];

Button.Primary = function ({ children, ...props }: ButtonProps) {
	const style = [...commonStyle, 'bg-gray-500'];

	return (
		<button className={style.join(' ')} {...props}>
			{children}
		</button>
	);
};

Button.Success = function ({ children, ...props }: ButtonProps) {
	const style = [...commonStyle, 'bg-emerald-500'];

	return (
		<button className={style.join(' ')} {...props}>
			{children}
		</button>
	);
};

Button.Danger = function ({ children, ...props }: ButtonProps) {
	const style = [...commonStyle, 'bg-red-500'];

	return (
		<button className={style.join(' ')} {...props}>
			{children}
		</button>
	);
};
