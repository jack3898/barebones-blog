import { TRPCError } from '@trpc/server';
import { createRouter } from '../trpcRouter';

export const postRouter = createRouter().query('post', {
	resolve({ ctx }) {
		if (!ctx.loggedInUser)
			throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not logged in' });

		return ctx.db.post.findMany({ where: { userId: ctx.loggedInUser.id } });
	}
});
