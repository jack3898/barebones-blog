import { router } from '@trpc/server';
import { Context } from './trpc';

export function createRouter() {
	return router<Context>();
}
