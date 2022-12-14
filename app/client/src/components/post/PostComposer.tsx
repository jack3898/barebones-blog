import { trpc, useSearchParamsContext } from '@blog/components/context';
import { Card, Form, Markdown, RequireAuth } from '@blog/components/core';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation, useInitialInfinitePostsQueryParams } from 'src/trpc-hooks';
import { usePostMutation } from 'src/trpc-hooks/usePostMutation';
import { CancelBtn } from './buttons/CancelBtn';
import { SubmitBtn } from './buttons/SubmitBtn';

export function PostComposer() {
	const trpcUtils = trpc.useContext();
	const [searchParams] = useSearchParamsContext();
	const createPostMutation = useCreatePostMutation();
	const post = usePostMutation();
	const navigate = useNavigate();

	const { handleSubmit, getFieldProps, values, resetForm, setValues } = useFormik({
		initialValues: {
			id: searchParams.edit || '',
			content: post.data?.content || ''
		},
		onSubmit(values) {
			createPostMutation
				.mutateAsync(values)
				.then(() => {
					resetForm();
					navigate('/');
				})
				.catch(console.error);
		}
	});

	useEffect(() => {
		if (!searchParams.edit) return;

		trpcUtils
			.fetchInfiniteQuery(['post.many', useInitialInfinitePostsQueryParams])
			.then((res) => {
				// Search for the post locally first
				const cachePost = res.pages
					.flatMap(({ items }) => items)
					.find(({ id }) => id === searchParams.edit);

				if (cachePost) {
					setValues({ id: cachePost?.id || '', content: cachePost?.content || '' });
					return;
				}

				post.mutateAsync({ id: searchParams.edit || '' }).then((apiPost) => {
					if (!apiPost) return;

					setValues({ id: apiPost.id, content: apiPost.content });
				});
			});

		window.scrollTo({ top: 0 });
	}, [searchParams.edit]);

	return (
		<RequireAuth>
			<Card
				className={`${
					values.content ? 'shadow-2xl relative' : ''
				} p-4 grid gap-4 transition-shadow max-h-screen `}
			>
				<Form.Body className="grid gap-4" onSubmit={handleSubmit}>
					<input type="hidden" {...getFieldProps('id')} />
					<Form.Textarea
						className="w-full bg-gray-100 rounded p-2"
						rows={6}
						placeholder="Write something interesting... ???? Supports markdown!"
						{...getFieldProps('content')}
					/>
					{values.content && (
						<>
							<div className="max-h-96 overflow-y-auto">
								<Markdown>{values.content}</Markdown>
							</div>
							<div className="flex gap-2">
								<SubmitBtn />
								<CancelBtn onConfirm={() => resetForm()} />
							</div>
						</>
					)}
				</Form.Body>
			</Card>
		</RequireAuth>
	);
}
