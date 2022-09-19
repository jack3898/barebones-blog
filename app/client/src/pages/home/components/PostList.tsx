import { Markdown, Post } from '@blog/components/core';
import { format } from 'date-fns';
import { RequireAuth } from 'src/components';
import { trpc } from 'src/trpc';

type PostListProps = {
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function PostList({ posts }: PostListProps) {
	const deletePostMutation = trpc.useMutation(['delete-post']);

	if (!posts.data) return null;

	return (
		<>
			{posts.data?.pages.map((page) => (
				<div key={page.cursor}>
					<div key={page.cursor} className="grid gap-4">
						{page.items.map(
							({ id, title, content, created, author: { firstname, lastname } }) => {
								return (
									<Post
										key={id}
										title={title}
										content={<Markdown>{content}</Markdown>}
										created={format(new Date(created), 'dd-MM-yyyy HH:mm')}
										author={`${firstname} ${lastname}`}
										controls={
											<RequireAuth>
												<div className="mt-2">
													<button
														onClick={async () => {
															deletePostMutation
																.mutateAsync({ id })
																.then(() => posts.refetch())
																.catch(console.error);
														}}
													>
														Delete
													</button>
												</div>
											</RequireAuth>
										}
									/>
								);
							}
						)}
					</div>
				</div>
			))}
		</>
	);
}
