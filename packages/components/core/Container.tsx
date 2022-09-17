import React from 'react';

type ContainerProps = {
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Container({ children, ...props }: ContainerProps) {
	return (
		<div {...props} className={`${props.className} max-w-4xl mx-auto w-full`}>
			{children}
		</div>
	);
}
