import { TrpcRouter } from '@blog/backend';
import { clientEnvironment } from '@blog/utils/both/httpenv/client';
import { createReactQueryHooks } from '@trpc/react';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const trpc = createReactQueryHooks<TrpcRouter>();

const queryClient = new QueryClient();

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
	const [trpcClient] = useTrpcClient();

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};

const { backendAddress, backendPort, backendEndpoint } = clientEnvironment;

const useTrpcClient = () => {
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
