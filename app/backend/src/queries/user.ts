import { createHash } from '@blog/utils/node/hash';
import { TRPCError } from '@trpc/server';
import { userCreateFirstValidation } from '../../validation/user';
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
		input: userCreateFirstValidation,
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
				data: { ...input, admin: true },
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
