import { trpc, useAuthContext } from '@blog/components/context';
import { useInitialInfinitePostsQueryParams } from './useInitialInfinitePostsQuery';

export function useCreateCommentMutation() {
	const trpcUtils = trpc.useContext();
	const { loggedInUser } = useAuthContext();

	return trpc.useMutation(['comment.create'], {
		onSuccess(response, request) {
			trpcUtils.setInfiniteQueryData(
				['post.many', useInitialInfinitePostsQueryParams],
				(data) => {
					if (!data) {
						return {
							pages: [],
							pageParams: []
						};
					}

					return {
						...data,
						pages: data?.pages.map((page) => ({
							...page,
							items: page.items.map((item) => {
								if (request.parentId) {
									/* when is a reply to a comment */
									item.comments.map((comment) => {
										if (comment.id === request.parentId) {
											comment.replies.unshift({
												...response,
												author: loggedInUser
											});
										}

										return comment;
									});
								} else {
									/* when is a reply to a post */
									item.comments.unshift({
										...response,
										author: loggedInUser,
										replies: []
									});
								}

								return item;
							})
						}))
					};
				}
			);
		}
	});
}
