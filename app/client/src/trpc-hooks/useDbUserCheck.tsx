import { trpc } from '@blog/components/trpc';

export function useDbUserCheck() {
	return trpc.useQuery(['user.dbhasone']);
}
