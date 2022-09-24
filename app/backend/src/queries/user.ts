import { createHash } from '@blog/utils';
import { TRPCError } from '@trpc/server';
import z from 'zod';
import { createRouter } from '../trpcRouter';

export const userRouter = createRouter()
	.query('user.loggedin', {
		resolve({ ctx }) {
			return ctx.loggedInUser;
		}
	})
	.query('user.dbhasone', {
		async resolve({ ctx }) {
			return {
				exists: !!(
					await ctx.db.user.findFirst({
						select: {
							id: true
						}
					})
				)?.id
			};
		}
	})
	.mutation('user.createfirst', {
		input: z.object({
			username: z.string(),
			email: z.string(),
			firstname: z.string(),
			lastname: z.string(),
			password: z.string()
		}),
		async resolve({ ctx, input }) {
			if (await ctx.db.user.findFirst()) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Expected to be first user, found users already!'
				});
			}

			const hashedPassword = await createHash(input.password);

			input.password = hashedPassword;

			return ctx.db.user.create({
				data: input,
				select: {
					id: true,
					username: true,
					email: true,
					firstname: true,
					lastname: true
				}
			});
		}
	});
