import { trpc } from 'src/trpc';

export function useDbUserCheck() {
	return trpc.useQuery(['user.dbhasone']);
}
