import { Card } from './Card';

type PostProps = {
	content: React.ReactNode;
	created: string;
	author: string;
	controls?: React.ReactNode;
};

export function Post({ content, created, author, controls }: PostProps) {
	return (
		<Card>
			<article className="p-4 grid gap-4">
				<div>{content}</div>
				<small>
					By {author}, {created}
					{controls ? <div>{controls}</div> : null}
				</small>
			</article>
		</Card>
	);
}
