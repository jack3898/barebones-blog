import * as trpc from '@trpc/server';
import { testRouter } from './queries';

export const backendRouter = trpc.router().merge(testRouter);

export type BackendRouter = typeof backendRouter;
