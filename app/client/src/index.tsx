import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { App } from './App';
import { queryClient, trpc, useTrpcClient } from './trpc';

import './index.css';

function Main() {
	const [trpcClient] = useTrpcClient();

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<Main />);
