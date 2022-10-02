import { backendEnvironment } from '@blog/utils/both/httpenv/backend';
import server from './express';
export * from './trpc';

const { backendInternalPort } = backendEnvironment;

server().listen(backendInternalPort, () => {
	console.log('BACKEND ONLINE!');
});
