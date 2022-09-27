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

const isDocker = !!process.env.DOCKER!;

export default function server() {
	if (isDocker) sslGen();

	const app = express();

	const { publicAddr, publicPort, backendInternalPort } = backendEnvironment;

	if (isDocker) {
		app.use(
			cors({
				origin: `${publicAddr}:${publicPort}`,
				credentials: true
			})
		);
	} else {
		app.use(
			cors({
				origin: `${publicAddr}:${publicPort}`,
				credentials: true
			})
		);
	}

	app.use(cookieParser());
	app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));
	app.use('/auth', authRouter);

	app.listen(backendInternalPort, () => {
		console.log('BACKEND ONLINE!');
	});
}
