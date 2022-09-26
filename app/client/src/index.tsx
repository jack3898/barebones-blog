import { AuthProvider, TRPCProvider } from '@blog/components/context';
import { SearchParamsProvider } from '@blog/components/context/searchParams';
import { Modal, ModalProvider } from '@blog/components/modal';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

function Main() {
	return (
		<Suspense>
			<TRPCProvider>
				<AuthProvider>
					<BrowserRouter>
						<SearchParamsProvider>
							<ModalProvider>
								<App />
								<Modal />
							</ModalProvider>
						</SearchParamsProvider>
					</BrowserRouter>
				</AuthProvider>
			</TRPCProvider>
		</Suspense>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<Main />);
