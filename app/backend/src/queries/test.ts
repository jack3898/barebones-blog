import * as trpc from '@trpc/server';

export const testRouter = trpc.router().query('test', {
	resolve() {
		return 'Test from tRPC!';
	}
});
