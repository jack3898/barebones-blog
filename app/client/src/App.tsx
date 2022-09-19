import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/auth';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));

export function App() {
	return (
		<AuthContextProvider>
			<Suspense>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</AuthContextProvider>
	);
}
