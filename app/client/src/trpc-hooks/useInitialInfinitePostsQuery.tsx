import { trpc } from '@blog/components/context';
import { useState } from 'react';

export const useInitialInfinitePostsQueryParams = { limit: 10 };

export function useInitialInfinitePostsQuery() {
	const [fetchInitialPostsEnabled, setFetchInitialPostsEnabled] = useState(true);

	return trpc.useInfiniteQuery(['post.many', useInitialInfinitePostsQueryParams], {
		getNextPageParam: ({ cursor }) => cursor,
		enabled: fetchInitialPostsEnabled,
		onSuccess() {
			setFetchInitialPostsEnabled(false);
		}
	});
}
