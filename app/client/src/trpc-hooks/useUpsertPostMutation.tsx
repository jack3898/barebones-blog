import { useAuthContext } from 'src/context';
import { trpc } from 'src/trpc';
import { useInitialInfinitePostsQueryParams } from './useInitialInfinitePostsQuery';

export function useUpsertPostMutation() {
	const trpcUtils = trpc.useContext();
	const { loggedInUser } = useAuthContext();

	return trpc.useMutation(['post.upsert'], {
		onSuccess({ id, content, created, updated }) {
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

					// Step 1, remove the existing record that is potentially updated
					const removed = {
						...data,
						pages: data?.pages.map((page) => ({
							...page,
							items: page.items.filter((item) => item.id !== id)
						}))
					};

					// Then insert the new version and return it
					return {
						...removed,
						pages: removed?.pages.map((page) => ({
							...page,
							items: [
								{
									id: id!,
									content,
									author: {
										firstname: loggedInUser?.firstname!,
										lastname: loggedInUser?.lastname!
									},
									created: created,
									published: false,
									updated: updated,
									userId: loggedInUser?.id!
								},
								...page.items
							]
						}))
					};
				}
			);
		}
	});
}