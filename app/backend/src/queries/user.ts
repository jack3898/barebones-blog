import { createRouter } from '../trpcRouter';

export const userRouter = createRouter().query('loggedinuser', {
	resolve({ ctx }) {
		return ctx.loggedInUser;
	}
});
