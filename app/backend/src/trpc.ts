import { decodeJwt, parseCookie, verifyJwt } from '@blog/utils';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import client from './prisma';
import { postRouter, testRouter, userRouter } from './queries';
import { createRouter } from './trpcRouter';

export type Context = inferAsyncReturnType<typeof createContext>;

export type TrpcRouter = typeof trpcRouter;

export type ctxUser = {
	id: string;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
};

export async function createContext(opts: CreateNextContextOptions) {
	const cookies = parseCookie<'auth'>(opts.req.headers.cookie);
	const loggedIn = cookies ? verifyJwt(cookies.auth) : false;

	return {
		loggedInUser: loggedIn ? decodeJwt<ctxUser>(cookies!.auth) : null,
		db: client,
		req: opts.req,
		res: opts.res
	};
}

// Register routers here
export const trpcRouter = createRouter().merge(testRouter).merge(postRouter).merge(userRouter);
