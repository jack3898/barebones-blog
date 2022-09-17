import { Container, Post } from '@blog/components/core';
import { format } from 'date-fns';
import { useAuthContext } from 'src/Context/auth';
import { trpc } from 'src/trpc';

export default function Home() {
	const posts = trpc.useQuery(['posts']);
	const { loggedInUser } = useAuthContext();

	if (!posts.isFetched) return null;

	return (
		<Container className="grid gap-8 px-4">
			<h1>Home</h1>
			<>
				{posts.data?.map(
					({ id, title, content, created, author: { firstname, lastname } }) => (
						<Post
							key={id}
							title={title}
							content={content}
							created={format(new Date(created), 'dd-MM-yyyy HH:mm')}
							author={`${firstname} ${lastname}`}
						/>
					)
				)}
			</>
			<p>
				Logged in as <strong>{loggedInUser?.username}</strong>
			</p>
		</Container>
	);
}
