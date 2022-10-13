import { backendEnvironment } from '@blog/utils/both/httpenv/backend';
import { rootenv } from '@blog/utils/node/rootenv';
import * as trpcExpress from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { authRouter } from './routes';
import { sslGen } from './sslgen';
import { createContext, trpcRouter } from './trpc';

rootenv();

export default function server() {
	if (process.env.DOCKER) sslGen();

	const app = express();
	const { publicAddr, publicPort } = backendEnvironment;

	app.use(
		cors({
			origin: `${publicAddr}:${publicPort}`,
			credentials: true
		})
	);

	app.use(cookieParser());
	app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));
	app.use('/auth', authRouter);

	return app;
}
