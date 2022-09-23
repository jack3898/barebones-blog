import { rootenv } from '@blog/utils';
import * as trpcExpress from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { backendEnvironment } from '../httpEnvironment';
import { authRouter } from './routes';
import { createContext, trpcRouter } from './trpc';

rootenv();

export default function server() {
	const app = express();

	const { publicAddr, publicPort, publicEndpoint, backendInternalPort } = backendEnvironment;

	app.use(
		cors({
			origin: `${publicAddr}:${publicPort}`,
			credentials: true
		})
	);

	app.use(cookieParser());
	app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));
	app.use('/auth', authRouter);

	app.listen(backendInternalPort, () => {
		console.log('ONLINE:', `${publicAddr}:${backendInternalPort}${publicEndpoint}`);
	});
}
