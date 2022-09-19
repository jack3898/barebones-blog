import { Post } from '@blog/components/core';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { trpc } from 'src/trpc';

type PostListProps = {
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function PostList({ posts }: PostListProps) {
	if (!posts.data) return null;

	return (
		<>
			{posts.data?.pages.map((page, index) => (
				<div key={page.cursor}>
					<div className="text-center mb-4">
						<span>Page {index + 1}</span>
					</div>
					<div key={page.cursor} className="grid gap-4">
						{page.items.map(
							({ id, title, content, created, author: { firstname, lastname } }) => (
								<Post
									key={id}
									title={title}
									content={<ReactMarkdown>{content}</ReactMarkdown>}
									created={format(new Date(created), 'dd-MM-yyyy HH:mm')}
									author={`${firstname} ${lastname}`}
								/>
							)
						)}
					</div>
				</div>
			))}
		</>
	);
}
