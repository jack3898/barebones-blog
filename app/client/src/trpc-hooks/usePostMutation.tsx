import { trpc } from '@blog/components/trpc';

export function usePostMutation() {
	return trpc.useMutation(['post.single']);
}
