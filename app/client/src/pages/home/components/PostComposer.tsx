import { Card, Markdown, Post } from '@blog/components/core';
import { DATE_TIME } from '@blog/constants/browser';
import { format } from 'date-fns';
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
			title: '',
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
				<strong>Create a new post</strong>
				<form className="grid gap-4" onSubmit={handleSubmit}>
					<label>
						<div>Title</div>
						<input
							type="text"
							{...getFieldProps('title')}
							className="max-w-2xl w-full"
						/>
					</label>
					<label>
						<div>Content (markdown)</div>
						<textarea
							className="w-full"
							rows={6}
							{...getFieldProps('content')}
						></textarea>
					</label>
					<div>
						<button type="submit" className="primary">
							Submit
						</button>
					</div>
				</form>
			</Card>
			{(values.title || values.content) && (
				<div className="p-2 bg-gray-600 bg-opacity-5 rounded shadow grid gap-4">
					<>
						<strong>Preview</strong>
						<Post
							title={values.title || 'No title yet!'}
							content={<Markdown>{values.content || 'No content yet!'}</Markdown>}
							created={format(new Date(), DATE_TIME)}
							author={`${loggedInUser?.firstname} ${loggedInUser?.lastname}`}
						/>
					</>
				</div>
			)}
		</RequireAuth>
	);
}
