import { Container } from '@blog/components/core';
import { useInView } from 'react-intersection-observer';
import { trpc } from 'src/trpc';
import { PostComposer } from './components/PostComposer';
import { PostList } from './components/PostList';

export default function Home() {
	const posts = trpc.useInfiniteQuery(['posts', { limit: 10 }], {
		getNextPageParam: ({ cursor }) => cursor
	});
	const hasNextPage = !!posts.data?.pages[posts.data.pages.length - 1].cursor;
	const { ref, inView } = useInView();

	if (inView && hasNextPage) {
		posts.fetchNextPage();
	}

	return (
		<Container className="grid gap-4 px-4">
			<h1>Posts</h1>
			<PostComposer />
			<PostList posts={posts} />
			{/* Infinite scroll trigger */}
			<i ref={ref} />
		</Container>
	);
}
