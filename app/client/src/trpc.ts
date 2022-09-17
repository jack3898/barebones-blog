import { TrpcRouter } from '@blog/backend';
import { createReactQueryHooks } from '@trpc/react';
import { useState } from 'react';
import { QueryClient } from 'react-query';

export const trpc = createReactQueryHooks<TrpcRouter>();

export const queryClient = new QueryClient();

export const useTrpcClient = () =>
	useState(() =>
		trpc.createClient({
			url: `${process.env.SERVER_ORIGIN}/trpc`,
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: 'include'
				});
			}
		})
	);
