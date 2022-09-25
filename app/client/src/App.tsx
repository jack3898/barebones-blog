import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Admin = lazy(() => import('./pages/admin'));

export function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</>
	);
}
