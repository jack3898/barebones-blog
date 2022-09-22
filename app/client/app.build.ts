import { bundler, errorHandler } from '@blog/config-webpack';
import { ROOT } from '@blog/constants/node';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export const webpackClientConfig: Parameters<typeof bundler>[0] = {
	output: {
		path: path.resolve(ROOT, 'dist', 'client'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve('src', 'index.html') }),
		new Dotenv({ systemvars: true, path: path.resolve(ROOT, '.env') })
	]
};

bundler(webpackClientConfig).run(errorHandler);
