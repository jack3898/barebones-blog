import { Container } from '@blog/components/core';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInitialInfinitePostsQuery } from 'src/trpc-hooks';
import { PostComposer } from './components/PostComposer';
import { PostList } from './components/PostList';

export default function Home() {
	const posts = useInitialInfinitePostsQuery();
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && posts.hasNextPage) {
			posts.fetchNextPage();
		}
	}, [inView]);

	return (
		<Container className="grid gap-4 px-4">
			<h1>Posts</h1>
			<PostComposer />
			<PostList />
			{/* Infinite scroll trigger */}
			<i ref={ref} />
		</Container>
	);
}
