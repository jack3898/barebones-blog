import { trpc } from '@blog/components/context';

export function useCreateCommentMutation() {
	return trpc.useMutation(['comment.create']);
}
