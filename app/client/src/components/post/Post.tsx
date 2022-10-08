import { Card } from '@blog/components/core';

type PostProps = {
	content: React.ReactNode;
	created: string;
	author: string;
	footer?: React.ReactNode;
};

export function Post({ content, created, author, footer }: PostProps) {
	return (
		<Card className="overflow-hidden">
			<article className="p-4 grid gap-4">
				<div>{content}</div>
				<small>
					By {author}, {created}
				</small>
				{footer ? <div>{footer}</div> : null}
			</article>
		</Card>
	);
}
