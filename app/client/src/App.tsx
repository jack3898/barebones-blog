import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));

export function App() {
	return (
		<Suspense>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}
