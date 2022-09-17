import { createRouter } from '../trpcRouter';

export const testRouter = createRouter().query('test', {
	resolve({ ctx }) {
		return {
			message: 'Test from tRPC!',
			user: ctx.loggedInUser
		};
	}
});
