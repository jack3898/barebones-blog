import { TRPCError } from '@trpc/server';
import { commentCreateValidation } from '../../validation/comment';
import { createRouter } from '../trpcRouter';

export const commentRouter = createRouter().mutation('comment.create', {
	input: commentCreateValidation,
	resolve({ ctx, input }) {
		if (!ctx.loggedInUser) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'You must be logged in to create a comment.'
			});
		}

		return ctx.db.comment.create({
			data: {
				content: input.content,
				userId: ctx.loggedInUser.id,
				postId: input.postId,
				parentId: input.parentId || null
			}
		});
	}
});
