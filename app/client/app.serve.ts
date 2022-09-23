import { server } from '@blog/config-webpack';
import { rootenv } from '@blog/utils';
import { webpackClientConfig } from './app.build';

rootenv();

server(
	{
		port: process.env.CLIENT_DEV_PORT
	},
	webpackClientConfig
).start();
