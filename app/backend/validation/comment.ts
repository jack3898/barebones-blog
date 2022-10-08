import { z } from 'zod';

export const commentCreateValidation = z.object({
	content: z.string().max(400),
	postId: z.string(),
	parentId: z.string().nullish()
});
