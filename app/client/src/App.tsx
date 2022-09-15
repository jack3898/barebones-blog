import { Test } from '@blog/components/core';
import { trpc } from './trpc';

export function App() {
	const testQuery = trpc.useQuery(['test']);

	return <Test message={testQuery.data} />;
}
