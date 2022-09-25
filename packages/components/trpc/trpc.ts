import { TrpcRouter } from '@blog/backend';
import { clientEnvironment } from '@blog/utils/both/httpenv/client';
import { createReactQueryHooks } from '@trpc/react';
import { useState } from 'react';
import { QueryClient } from 'react-query';

export const trpc = createReactQueryHooks<TrpcRouter>();

export const queryClient = new QueryClient();

const { backendAddress, backendPort, backendEndpoint } = clientEnvironment;

export const useTrpcClient = () => {
	return useState(() =>
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
};
