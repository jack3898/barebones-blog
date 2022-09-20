import { Card, Markdown } from '@blog/components/core';
import { useFormik } from 'formik';
import { RequireAuth } from 'src/components';
import { useAuthContext } from 'src/context';
import { trpc } from 'src/trpc';

type PostComposerProps = {
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function PostComposer({ posts }: PostComposerProps) {
	const createPostMutation = trpc.useMutation(['create-post']);
	const { loggedInUser } = useAuthContext();
	const { handleSubmit, getFieldProps, values, resetForm } = useFormik({
		initialValues: {
			content: ''
		},
		onSubmit(values) {
			createPostMutation
				.mutateAsync(values)
				.then(() => posts.refetch())
				.then(() => resetForm())
				.catch(console.error);
		}
	});

	return (
		<RequireAuth>
			<Card className="p-4 grid gap-4">
				<form className="grid gap-4" onSubmit={handleSubmit}>
					<label>
						<textarea
							className="w-full bg-gray-100 rounded p-2"
							rows={6}
							placeholder="Write something interesting... 🤔"
							{...getFieldProps('content')}
						></textarea>
					</label>
					<div>
						<button type="submit" className="primary">
							Submit
						</button>
					</div>
				</form>
				{values.content && (
					<>
						<hr />
						<div>
							<Markdown>{values.content}</Markdown>
						</div>
					</>
				)}
			</Card>
		</RequireAuth>
	);
}
