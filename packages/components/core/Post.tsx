import { Card } from './Card';

type PostProps = {
	title: string;
	content: React.ReactNode;
	created: string;
	author: string;
	controls?: React.ReactNode;
};

export function Post({ title, content, created, author, controls }: PostProps) {
	return (
		<Card>
			<article className="p-4 grid gap-4">
				<h2>{title}</h2>
				<div>{content}</div>
				<small>
					By {author}, {created}
					{controls ? <div>{controls}</div> : null}
				</small>
			</article>
		</Card>
	);
}
