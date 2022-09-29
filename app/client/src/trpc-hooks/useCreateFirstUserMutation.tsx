import { trpc } from '@blog/components/context';

export function useCreateFirstUserMutation() {
	return trpc.useMutation(['user.createfirst']);
}
