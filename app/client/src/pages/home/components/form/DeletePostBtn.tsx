import { trpc } from 'src/trpc';

type DeletePostBtnProps = {
	id: string;
	show: boolean;
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function DeletePostBtn({ id, show, posts }: DeletePostBtnProps) {
	const deletePostMutation = trpc.useMutation(['delete-post']);

	if (!show) return null;

	return (
		<button
			className="danger"
			onClick={async () => {
				// TODO: Replace with modal
				const shouldDelete = confirm(
					'Are you sure you want to delete this post? You cannot undo this!'
				);

				if (!shouldDelete) return;

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