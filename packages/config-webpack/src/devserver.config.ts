import { rootenv } from '@blog/utils/node/rootenv';
import { Configuration as DevServerConfig } from 'webpack-dev-server';

rootenv();

const port = process.env.DOCKER ? process.env.CLIENT_INT_PORT : process.env.CLIENT_DEV_PORT;

const devServerConfig: DevServerConfig = {
	port,
	static: { directory: 'assets' },
	hot: true,
	historyApiFallback: true
};

export default devServerConfig;
