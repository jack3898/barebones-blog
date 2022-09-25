import { server } from '@blog/config-webpack';
import { rootenv } from '@blog/utils/node/rootenv';
import { webpackClientConfig } from './app.build';

rootenv();

server(
	{
		port: process.env.CLIENT_DEV_PORT
	},
	webpackClientConfig
).start();
