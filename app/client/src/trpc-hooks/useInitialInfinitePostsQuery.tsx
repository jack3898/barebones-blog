import { useState } from 'react';
import { trpc } from 'src/trpc';

export const useInitialInfinitePostsQueryParams = { limit: 10 };

export function useInitialInfinitePostsQuery() {
	const [fetchInitialPostsEnabled, setFetchInitialPostsEnabled] = useState(true);

	return trpc.useInfiniteQuery(['posts', useInitialInfinitePostsQueryParams], {
		getNextPageParam: ({ cursor }) => cursor,
		enabled: fetchInitialPostsEnabled,
		onSuccess() {
			setFetchInitialPostsEnabled(false);
		}
	});
}
