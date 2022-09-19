import { TRPCError } from '@trpc/server';
import z from 'zod';
import { createRouter } from '../trpcRouter';

export const postRouter = createRouter()
	.query('posts', {
		resolve({ ctx }) {
			return ctx.db.post.findMany({
				where: {
					published: true
				},
				orderBy: {
					created: 'desc'
				},
				include: {
					author: {
						select: {
							firstname: true,
							lastname: true
						}
					}
				}
			});
		}
	})
	.mutation('create-post', {
		input: z.object({
			title: z.string(),
			content: z.string(),
			published: z.boolean()
		}),
		resolve({ ctx, input }) {
			if (!ctx.loggedInUser) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to create a new post!'
				});
			}

			return ctx.db.post.create({
				data: {
					title: input.title,
					content: input.content,
					published: input.published,
					userId: ctx.loggedInUser.id
				}
			});
		}
	});
