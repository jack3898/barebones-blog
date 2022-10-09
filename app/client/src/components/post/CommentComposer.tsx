import { commentCreateValidation } from '@blog/backend/validation/comment';
import { Form, RequireAuth } from '@blog/components/core';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useCreateCommentMutation } from 'src/trpc-hooks';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { CancelBtn } from './buttons/CancelBtn';
import { SubmitBtn } from './buttons/SubmitBtn';

type CommmentComposerProps = {
	parentId?: string;
	postId: string;
	onCancel?: () => void;
	onSuccess?: () => void;
	placeholder?: string;
};

export function CommentComposer({
	postId,
	parentId = '',
	onCancel,
	onSuccess,
	placeholder
}: CommmentComposerProps) {
	const createCommentMutation = useCreateCommentMutation();
	const { handleSubmit, getFieldProps, errors } = useFormik({
		initialValues: {
			postId,
			parentId,
			content: ''
		},
		validationSchema: toFormikValidationSchema(commentCreateValidation),
		onSubmit(values) {
			createCommentMutation.mutate(values);
		}
	});

	useEffect(() => {
		if (createCommentMutation.status === 'success') {
			onSuccess?.();
		}
	}, [createCommentMutation.status]);

	return (
		<RequireAuth>
			<Form.Body onSubmit={handleSubmit}>
				<input type="hidden" {...getFieldProps('postId')} />
				<input type="hidden" {...getFieldProps('parentId')} />
				<Form.Textarea
					{...getFieldProps('content')}
					className="w-full bg-gray-100 rounded p-2"
					placeholder={placeholder}
					error={errors.content}
				></Form.Textarea>
				<Form.Section className="flex gap-2">
					<SubmitBtn />
					<CancelBtn onConfirm={() => onCancel?.()} />
				</Form.Section>
			</Form.Body>
		</RequireAuth>
	);
}
