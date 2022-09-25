import { ROOT } from '@blog/constants/node';
import { rootenv } from '@blog/utils/node/rootenv';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration as WebpackConfig } from 'webpack';

rootenv();

const webpackConfig: WebpackConfig = {
	mode: process.env.NODE_ENV as any,
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		plugins: [new TsconfigPathsPlugin()] // So baseUrl in tsconfig works
	},
	resolveLoader: { modules: [path.resolve(ROOT, 'node_modules')] },
	performance: { hints: false },
	module: {
		rules: [
			{
				test: /\.ts?x?$/,
				use: [
					{
						loader: 'ts-loader',
						options: { transpileOnly: true }
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: 'assets/[hash].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['tailwindcss', 'autoprefixer']
							}
						}
					}
				]
			}
		]
	}
};

export default webpackConfig;
