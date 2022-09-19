export type CardProps = {
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, ...props }: CardProps) {
	return (
		<div {...props} className={`${props.className || ''} bg-white shadow rounded`}>
			{children}
		</div>
	);
}
