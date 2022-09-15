import { rootenv } from '@blog/utils';
import { Configuration as DevServerConfig } from 'webpack-dev-server';

rootenv();

const url = new URL(process.env.CLIENT_ORIGIN!);

const devServerConfig: DevServerConfig = {
	port: url.port,
	static: { directory: 'assets' },
	hot: true,
	historyApiFallback: true
};

export default devServerConfig;
