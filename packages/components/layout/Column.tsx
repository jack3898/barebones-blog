import { Container } from '../core';

type ColumnProps = {
	header: React.ReactNode;
	main: React.ReactNode;
	footer: React.ReactNode;
};

export function Column({ header, main, footer }: ColumnProps) {
	return (
		<Container className="grid gap-12 px-4">
			<header className="grid gap-4">{header}</header>
			<main>{main}</main>
			<footer>{footer}</footer>
		</Container>
	);
}
