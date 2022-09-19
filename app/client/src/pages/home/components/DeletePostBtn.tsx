import { trpc } from 'src/trpc';

type DeletePostBtnProps = {
	id: string;
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function DeletePostBtn({ id, posts }: DeletePostBtnProps) {
	const deletePostMutation = trpc.useMutation(['delete-post']);

	return (
		<button
			className="danger"
			onClick={async () => {
				deletePostMutation
					.mutateAsync({ id })
					.then(() => posts.refetch())
					.catch(console.error);
			}}
		>
			Delete
		</button>
	);
}
