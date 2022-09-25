import { Modal, ModalContextProvider } from '@blog/components/modal';
import { queryClient, trpc, useTrpcClient } from '@blog/components/trpc';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AuthContextProvider } from './context';

import { SearchParamsProvider } from '@blog/components/context/searchParams';
import './index.css';

function Main() {
	const [trpcClient] = useTrpcClient();

	// TODO: Flatten these providers with a utility function/component
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<Suspense>
						<BrowserRouter>
							<SearchParamsProvider>
								<ModalContextProvider>
									<App />
									<Modal />
								</ModalContextProvider>
							</SearchParamsProvider>
						</BrowserRouter>
					</Suspense>
				</AuthContextProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<Main />);
