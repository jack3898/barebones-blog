import z from 'zod';

export const userCreateValidation = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	firstname: z.string(),
	lastname: z.string(),
	password: z.string().min(8)
});
