import { trpc } from '@blog/components/context';

export function usePostMutation() {
	return trpc.useMutation(['post.single']);
}
