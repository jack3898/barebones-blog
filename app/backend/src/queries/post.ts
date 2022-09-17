import { createRouter } from '../trpcRouter';

export const postRouter = createRouter().query('posts', {
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
});
