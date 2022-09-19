import { Card } from './Card';

type PostProps = {
	title: string;
	content: React.ReactNode;
	created: string;
	author: string;
};

export function Post({ title, content, created, author }: PostProps) {
	return (
		<Card>
			<article className="p-4 grid gap-4">
				<h2>{title}</h2>
				<div>{content}</div>
				<small>
					By {author}, {created}
				</small>
			</article>
		</Card>
	);
}
