import { server } from '@blog/config-webpack';
import { webpackClientConfig } from './app.build';

server(undefined, webpackClientConfig).start();
