import { useAuthContext } from '@blog/components/context';
import { Column } from '@blog/components/layout';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Header } from 'src/components';
import { useInitialInfinitePostsQuery } from 'src/trpc-hooks';
import { PostComposer } from '../../components/post/PostComposer';
import { PostList } from '../../components/post/PostList';

export default function Home() {
	const posts = useInitialInfinitePostsQuery();
	const { ref, inView } = useInView();
	const { loggedInUser } = useAuthContext();

	useEffect(() => {
		if (inView && posts.hasNextPage) {
			posts.fetchNextPage();
		}
	}, [inView]);

	return (
		<Column
			header={
				<Header
					pageTitle={loggedInUser ? `${loggedInUser.firstname}'s feed` : 'Public feed'}
				/>
			}
			main={
				<div className="grid gap-4">
					<PostComposer />
					<PostList />
					<i ref={ref} />
				</div>
			}
			footer={null}
		/>
	);
}
