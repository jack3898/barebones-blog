import { rootenv } from '@blog/utils';
import * as trpcExpress from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { authRouter } from './routes';
import { createContext, trpcRouter } from './trpc';

rootenv();

export default function server() {
	const app = express();
	const port = new URL(process.env.SERVER_ORIGIN!).port;

	app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
	app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));
	app.use('/auth', authRouter);
	app.use(cookieParser());

	app.listen(port, () => {
		console.log(`CORS address:	${process.env.CLIENT_ORIGIN}`);
		console.log(`Backend address:	${process.env.SERVER_ORIGIN}`);
	});
}
