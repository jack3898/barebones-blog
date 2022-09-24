import { useAuthContext } from 'src/context';
import { trpc } from 'src/trpc';
import { useInitialInfinitePostsQueryParams } from './useInitialInfinitePostsQuery';

export function useCreatePostMutation() {
	const trpcUtils = trpc.useContext();
	const { loggedInUser } = useAuthContext();

	return trpc.useMutation(['create-post'], {
		onSuccess(_, { id, content }) {
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
							items: [
								{
									id: id!,
									content,
									author: {
										firstname: loggedInUser?.firstname!,
										lastname: loggedInUser?.lastname!
									},
									created: new Date(),
									published: false,
									updated: new Date(),
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
