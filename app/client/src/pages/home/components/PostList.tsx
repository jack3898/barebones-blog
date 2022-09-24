import { Markdown, Post } from '@blog/components/core';
import { DATE_TIME } from '@blog/constants/browser';
import { format } from 'date-fns';
import { RequireAuth } from 'src/components';
import { trpc } from 'src/trpc';
import {
	useDeletePostMutation,
	useInitialInfinitePostsQueryParams,
	usePublishPostMutation
} from 'src/trpc-hooks';
import { DeletePostBtn } from './form/DeletePostBtn';
import { EditPostBtn } from './form/EditPostBtn';
import { TogglePublishBtn } from './form/TogglePublishBtn';

export function PostList() {
	const trpcUtils = trpc.useContext();
	const deletePostMutation = useDeletePostMutation();
	const publishPostMutation = usePublishPostMutation();
	const postsResponse = trpcUtils.getInfiniteQueryData([
		'post.many',
		useInitialInfinitePostsQueryParams
	]);

	if (!postsResponse?.pages) return null;

	const posts = postsResponse.pages.flatMap(({ items }) => items);

	return (
		<>
			{posts.map(({ id, content, created, published, author: { firstname, lastname } }) => (
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
										onClick={() => {
											publishPostMutation.mutate({
												id,
												published: !published
											});
										}}
									/>
									<EditPostBtn id={id} />
								</div>
								<div className="text-right">
									<DeletePostBtn
										show={!published}
										onClick={() =>
											deletePostMutation.mutate({
												id
											})
										}
									/>
								</div>
							</div>
						</RequireAuth>
					}
				/>
			))}
		</>
	);
}
