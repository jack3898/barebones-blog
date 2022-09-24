import { trpc } from 'src/trpc';

export function usePostMutation() {
	return trpc.useMutation(['post.single']);
}
