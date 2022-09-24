import { trpc } from 'src/trpc';
import { useInitialInfinitePostsQueryParams } from './useInitialInfinitePostsQuery';

export function useDeletePostMutation() {
	const trpcUtils = trpc.useContext();

	return trpc.useMutation(['post.delete'], {
		onSuccess(_, { id }) {
			trpcUtils.cancelQuery(['post.many']);

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
							items: page.items.filter((item) => item.id !== id)
						}))
					};
				}
			);
		}
	});
}
