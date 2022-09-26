import { trpc } from '@blog/components/context';

export function useDbUserCheck() {
	return trpc.useQuery(['user.dbhasone']);
}
