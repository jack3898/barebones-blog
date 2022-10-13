import { TRPCError } from '@trpc/server';
import {
	postDeleteValidation,
	postManyValidation,
	postSetPublishValidation,
	postSingleValidation,
	postUpsertValidation
} from '../../validation/post';
import { createRouter } from '../trpcRouter';

export const postRouter = createRouter()
	.query('post.many', {
		input: postManyValidation,
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
							lastname: true,
							username: true
						}
					},
					comments: {
						where: {
							parentId: null
						},
						orderBy: {
							created: 'desc'
						},
						select: {
							id: true,
							author: {
								select: {
									firstname: true,
									lastname: true,
									username: true
								}
							},
							content: true,
							replies: {
								orderBy: {
									created: 'desc'
								},
								select: {
									id: true,
									content: true,
									author: {
										select: {
											firstname: true,
											lastname: true,
											username: true
										}
									},
									postId: true,
									parentId: true
								}
							},
							postId: true
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
	.mutation('post.single', {
		input: postSingleValidation,
		resolve({ ctx, input }) {
			return ctx.db.post.findUnique({
				where: {
					id: input.id
				}
			});
		}
	})
	.mutation('post.upsert', {
		input: postUpsertValidation,
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
				},
				select: {
					id: true,
					content: true,
					created: true,
					updated: true,
					published: true
				}
			});
		}
	})
	.mutation('post.delete', {
		input: postDeleteValidation,
		async resolve({ ctx, input }) {
			if (!ctx.loggedInUser) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to delete a post'
				});
			}

			const data = await ctx.db.post.deleteMany({
				where: {
					id: input.id,
					published: false,
					userId: ctx.loggedInUser.id
				}
			});

			return data;
		}
	})
	.mutation('post.setpublish', {
		input: postSetPublishValidation,
		async resolve({ ctx, input }) {
			if (!ctx.loggedInUser) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to publish/unpublish a post'
				});
			}

			const data = await ctx.db.post.updateMany({
				where: {
					id: input.id,
					userId: ctx.loggedInUser.id
				},
				data: {
					published: input.published
				}
			});

			if (!data.count) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Not the owner of the post'
				});
			}

			return data;
		}
	});
