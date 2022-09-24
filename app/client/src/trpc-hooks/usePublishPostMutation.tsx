import { trpc } from 'src/trpc';
import { useInitialInfinitePostsQueryParams } from './useInitialInfinitePostsQuery';

export function usePublishPostMutation() {
	const trpcUtils = trpc.useContext();

	return trpc.useMutation(['publish-post'], {
		onSuccess(_, { id, published }) {
			trpcUtils.cancelQuery(['posts']);

			trpcUtils.setInfiniteQueryData(
				['posts', useInitialInfinitePostsQueryParams],
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
								if (item.id !== id) return item;

								item.published = published;

								return item;
							})
						}))
					};
				}
			);
		}
	});
}
