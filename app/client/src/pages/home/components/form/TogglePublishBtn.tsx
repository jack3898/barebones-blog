import { trpc } from 'src/trpc';

type TogglePublishBtnProps = {
	id: string;
	published: boolean;
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function TogglePublishBtn({ id, published, posts }: TogglePublishBtnProps) {
	const publishPostMutation = trpc.useMutation(['publish-post']);

	return (
		<button
			className={published ? 'danger' : 'success'}
			onClick={() => {
				publishPostMutation
					.mutateAsync({
						id,
						published: !published
					})
					.then(() => posts.refetch())
					.catch(console.error);
			}}
		>
			{published ? 'Un-publish' : 'Publish'}
		</button>
	);
}
