import { Link } from 'react-router-dom';
import { trpc } from 'src/trpc';

export default function Home() {
	const posts = trpc.useQuery(['post']);

	return (
		<>
			<h1>Home</h1>
			<Link to="login">Login</Link>
			<br />
			{JSON.stringify(posts.data)}
		</>
	);
}
