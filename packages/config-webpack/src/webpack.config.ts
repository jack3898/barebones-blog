import { ROOT } from '@blog/constants';
import { rootenv } from '@blog/utils';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration as WebpackConfig } from 'webpack';

rootenv();

const APP_DIR = path.resolve();

const webpackConfig: WebpackConfig = {
	mode: process.env.NODE_ENV as any,
	devtool: 'source-map',
	resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
	resolveLoader: { modules: [path.resolve(ROOT, 'node_modules')] },
	performance: { hints: false },
	output: {
		path: path.resolve(APP_DIR, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
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
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve(APP_DIR, 'src', 'index.html') }),
		new Dotenv({ systemvars: true, path: path.resolve(ROOT, '.env') })
	]
};

export default webpackConfig;
