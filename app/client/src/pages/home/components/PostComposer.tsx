import { Card, Markdown } from '@blog/components/core';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequireAuth } from 'src/components';
import { useSearchParamsContext } from 'src/context/searchParams';
import { trpc } from 'src/trpc';

type PostComposerProps = {
	posts: ReturnType<typeof trpc.useInfiniteQuery<'posts'>>;
};

export function PostComposer({ posts }: PostComposerProps) {
	const [searchParams, updateSearchParams] = useSearchParamsContext();
	const createPostMutation = trpc.useMutation(['create-post']);
	const post = trpc.useMutation(['post']);
	const navigate = useNavigate();

	const { handleSubmit, getFieldProps, values, resetForm, setValues } = useFormik({
		initialValues: {
			id: searchParams.edit || '',
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
		if (searchParams.edit) {
			post.mutateAsync({ id: searchParams.edit }).then((res) => {
				setValues({ id: res?.id || '', content: res?.content! });
			});
		} else {
			resetForm();
		}
	}, [searchParams.edit]);

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
					<div className="flex gap-2">
						<button type="submit" className="primary">
							{searchParams.edit ? 'Submit edit' : 'Submit'}
						</button>
						{searchParams.edit && (
							<button
								className="danger"
								type="button"
								onClick={() => {
									const response = confirm(
										'Are you sure you want to discard your edit changes?'
									);
									if (response) updateSearchParams('delete', 'edit');
								}}
							>
								Cancel edit
							</button>
						)}
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
