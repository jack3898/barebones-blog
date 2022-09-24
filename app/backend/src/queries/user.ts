import { createRouter } from '../trpcRouter';

export const userRouter = createRouter().query('user.loggedin', {
	resolve({ ctx }) {
		return ctx.loggedInUser;
	}
});
