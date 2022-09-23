import { TrpcRouter } from '@blog/backend';
import { createReactQueryHooks } from '@trpc/react';
import { clientEnvironment } from 'httpEnvironment';
import { useState } from 'react';
import { QueryClient } from 'react-query';

export const trpc = createReactQueryHooks<TrpcRouter>();

export const queryClient = new QueryClient();

const { backendAddress, backendPort, backendEndpoint } = clientEnvironment;

export const useTrpcClient = () =>
	useState(() =>
		trpc.createClient({
			url: `${backendAddress}:${backendPort}${backendEndpoint}/trpc`,
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: 'include'
				});
			}
		})
	);
