import { rootenv } from '@blog/utils';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { backendRouter } from './router';

rootenv();

const app = express();
const port = new URL(process.env.SERVER_ORIGIN!).port;

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use('/trpc', trpcExpress.createExpressMiddleware({ router: backendRouter }));

app.listen(port, () => console.log(`Backend server online and ready to go on port ${port}`));

export * from './router';
