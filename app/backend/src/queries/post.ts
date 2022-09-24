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
			const limit = Math.min(25, input.limit || 10);

			let cursor: string | null = null;

			const items = await ctx.db.post.findMany({
				where: {
					published: ctx.loggedInUser ? undefined : true
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
	.mutation('post', {
		input: z.object({
			id: z.string()
		}),
		resolve({ ctx, input }) {
			return ctx.db.post.findUnique({
				where: {
					id: input.id
				}
			});
		}
	})
	.mutation('create-post', {
		input: z.object({
			id: z.string().nullish(),
			content: z.string()
		}),
		resolve({ ctx, input }) {
			if (!ctx.loggedInUser) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to create or update a post'
				});
			}

			return ctx.db.post.upsert({
				where: {
					id: input.id || ''
				},
				update: {
					content: input.content,
					userId: ctx.loggedInUser.id
				},
				create: {
					content: input.content,
					published: false,
					userId: ctx.loggedInUser.id
				}
			});
		}
	})
	.mutation('delete-post', {
		input: z.object({
			id: z.string()
		}),
		resolve({ ctx, input }) {
			if (!ctx.loggedInUser) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to delete a post'
				});
			}

			return ctx.db.post.deleteMany({
				where: {
					id: input.id,
					published: false,
					userId: ctx.loggedInUser.id
				}
			});
		}
	})
	.mutation('publish-post', {
		input: z.object({
			id: z.string(),
			published: z.boolean()
		}),
		resolve({ ctx, input }) {
			if (!ctx.loggedInUser) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to publish/unpublish a post'
				});
			}

			return ctx.db.post.updateMany({
				where: {
					id: input.id,
					userId: ctx.loggedInUser.id
				},
				data: {
					published: input.published
				}
			});
		}
	});
