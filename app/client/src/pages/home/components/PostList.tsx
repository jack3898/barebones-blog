import { Markdown, Post } from '@blog/components/core';
import { DATE_TIME } from '@blog/constants/browser';
import { format } from 'date-fns';
import { RequireAuth } from 'src/components';
import { trpc } from 'src/trpc';
import { DeletePostBtn } from './form/DeletePostBtn';
import { EditPostBtn } from './form/EditPostBtn';
import { TogglePublishBtn } from './form/TogglePublishBtn';

type PostListProps = {
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function PostList({ posts }: PostListProps) {
	if (!posts.data) return null;

	return (
		<>
			{/* TODO: Reduce this boilerplate with a reducer or something */}
			{posts.data?.pages.map((page, index) => (
				<div key={index} className="grid gap-4">
					{page.items.map(
						({ id, content, created, published, author: { firstname, lastname } }) => {
							return (
								<Post
									key={id}
									content={<Markdown>{content}</Markdown>}
									created={format(new Date(created), DATE_TIME)}
									author={`${firstname} ${lastname}`}
									controls={
										<RequireAuth>
											<div className="mt-2 flex gap-2 justify-between">
												<div className="flex gap-2">
													<TogglePublishBtn
														id={id}
														published={published}
														posts={posts}
													/>
													<EditPostBtn id={id} />
												</div>
												<div className="text-right">
													<DeletePostBtn
														show={!published}
														id={id}
														posts={posts}
													/>
												</div>
											</div>
										</RequireAuth>
									}
								/>
							);
						}
					)}
				</div>
			))}
		</>
	);
}
