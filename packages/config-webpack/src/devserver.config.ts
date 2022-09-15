import { Configuration as DevServerConfig } from 'webpack-dev-server';

const devServerConfig: DevServerConfig = {
	port: 3000,
	static: { directory: 'assets' },
	hot: true,
	historyApiFallback: true
};

export default devServerConfig;
