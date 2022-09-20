import { Card, Markdown } from '@blog/components/core';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RequireAuth } from 'src/components';
import { trpc } from 'src/trpc';

type PostComposerProps = {
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function PostComposer({ posts }: PostComposerProps) {
	const [searchParams] = useSearchParams();
	const createPostMutation = trpc.useMutation(['create-post']);
	const post = trpc.useMutation(['post']);
	const navigate = useNavigate();

	const { handleSubmit, getFieldProps, values, resetForm, setValues } = useFormik({
		initialValues: {
			id: searchParams.get('edit') || undefined,
			content: post.data?.content || ''
		},
		onSubmit(values) {
			createPostMutation
				.mutateAsync(values)
				.then(() => posts.refetch())
				.then(() => {
					resetForm();
					navigate('/');
				})
				.catch(console.error);
		}
	});

	useEffect(() => {
		if (searchParams.get('edit')) {
			post.mutateAsync({ id: searchParams.get('edit')! }).then((res) => {
				setValues({ id: res?.id, content: res?.content! });
			});
		}
	}, []);

	return (
		<RequireAuth>
			<Card className="p-4 grid gap-4">
				<form className="grid gap-4" onSubmit={handleSubmit}>
					<input type="hidden" {...getFieldProps('id')} />
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
