import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}
