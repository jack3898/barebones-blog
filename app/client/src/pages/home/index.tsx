import { Container, Post } from '@blog/components/core';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { useAuthContext } from 'src/Context/auth';
import { trpc } from 'src/trpc';
import { Compose } from './components/Compose';

export default function Home() {
	const posts = trpc.useQuery(['posts']);
	const { loggedInUser } = useAuthContext();

	if (!posts.isFetched) return null;

	return (
		<Container className="grid gap-8 px-4">
			<h1>Home</h1>
			{loggedInUser && <Compose />}
			{posts.data?.map(({ id, title, content, created, author: { firstname, lastname } }) => (
				<Post
					key={id}
					title={title}
					content={<ReactMarkdown>{content}</ReactMarkdown>}
					created={format(new Date(created), 'dd-MM-yyyy HH:mm')}
					author={`${firstname} ${lastname}`}
				/>
			))}
		</Container>
	);
}
