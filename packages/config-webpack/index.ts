import { Configuration as WebpackConfig, webpack } from 'webpack';
import devServer, { Configuration as DevServerConfig } from 'webpack-dev-server';
import devServerConfig from './src/devserver.config';
import webpackConfig from './src/webpack.config';

/**
 * Run a webpack bundle without the dev server. Used for deployment and pipelines.
 *
 * Outputs the bundle to a folder where the client is located as per the Webpack config.
 */
export const bundler = (webpackOverrides?: WebpackConfig) =>
	webpack(Object.assign(webpackConfig, webpackOverrides));

/**
 * Run a webpack dev server. Used for development purposes and hot reloading.
 */
export const server = (devServerOverrides?: DevServerConfig, webpackOverrides?: WebpackConfig) =>
	new devServer(Object.assign(devServerConfig, devServerOverrides), bundler(webpackOverrides));
