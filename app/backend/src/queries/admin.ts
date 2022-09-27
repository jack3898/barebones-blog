import { TRPCError } from '@trpc/server';
import { createRouter } from '../trpcRouter';

export const adminRouter = createRouter().middleware((args) => {
	if (!args.ctx.loggedInUser) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You must be logged in.'
		});
	}

	return args.next({ ctx: args.ctx });
});
