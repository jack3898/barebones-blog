import { Card, Post } from '@blog/components/core';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import ReactMarkdown from 'react-markdown';
import { useAuthContext } from 'src/Context/auth';
import { trpc } from 'src/trpc';

export function Compose() {
	const createPostMutation = trpc.useMutation(['create-post']);
	const { loggedInUser } = useAuthContext();
	const { handleSubmit, getFieldProps, values, resetForm } = useFormik({
		initialValues: {
			title: '',
			content: '',
			published: true
		},
		onSubmit: (values) => {
			createPostMutation.mutate(values);

			resetForm();
		}
	});

	return (
		<>
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
					<input type="hidden" {...getFieldProps('published')} />
					<div>
						<button type="submit">Publish</button>
					</div>
				</form>
			</Card>
			{(values.title || values.content) && (
				<div className="p-2 bg-gray-600 bg-opacity-5 rounded shadow grid gap-4">
					<>
						<strong>Preview</strong>{' '}
						<Post
							title={values.title || 'No title yet!'}
							content={
								<ReactMarkdown>{values.content || 'No content yet!'}</ReactMarkdown>
							}
							created={format(new Date(), 'dd-MM-yyyy HH:mm')}
							author={`${loggedInUser?.firstname} ${loggedInUser?.lastname}`}
						/>
					</>
				</div>
			)}
		</>
	);
}
