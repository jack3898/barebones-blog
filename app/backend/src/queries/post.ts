import { TRPCError } from '@trpc/server';
import z from 'zod';
import { createRouter } from '../trpcRouter';

export const postRouter = createRouter()
	.query('posts', {
		input: z.object({
			limit: z.number().nullish(),
			cursor: z.string().nullish()
		}),
		async resolve({ ctx, input }) {
			const limit = input.limit || 10;
			let cursor: string | null = null;

			const items = await ctx.db.post.findMany({
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
				},
				take: limit + 1, // one more for the cursor
				cursor: input.cursor ? { id: input.cursor } : undefined
			});

			if (items.length > limit) {
				cursor = items.pop()?.id || null;
			}

			return {
				items,
				cursor
			};
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
