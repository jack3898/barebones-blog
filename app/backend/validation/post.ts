import { z } from 'zod';

export const postManyValidation = z.object({
	limit: z.number().nullish(),
	cursor: z.string().nullish()
});

export const postSingleValidation = z.object({
	id: z.string()
});

export const postUpsertValidation = z.object({
	id: z.string().nullish(),
	content: z.string()
});

export const postDeleteValidation = z.object({
	id: z.string()
});

export const postSetPublishValidation = z.object({
	id: z.string(),
	published: z.boolean()
});
