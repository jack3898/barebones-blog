import { trpc } from '@blog/components/context';

export function useCreateUserMutation() {
	return trpc.useMutation(['user.create']);
}
