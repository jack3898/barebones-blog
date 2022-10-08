import { RequireAuth } from '@blog/components/core';
import { useDeletePostMutation, usePublishPostMutation } from 'src/trpc-hooks';
import { CommentBtn } from './buttons/CommentBtn';
import { DeletePostBtn } from './buttons/DeletePostBtn';
import { EditPostBtn } from './buttons/EditPostBtn';
import { TogglePublishBtn } from './buttons/TogglePublishBtn';

type ControlsProps = {
	postId: string;
	published: boolean;
	onStartComment: () => void;
};

export function Controls({ postId, published, onStartComment }: ControlsProps) {
	const publishPostMutation = usePublishPostMutation();
	const deletePostMutation = useDeletePostMutation();

	return (
		<RequireAuth>
			<div className="mt-2 flex gap-2 justify-between">
				<div className="flex gap-2">
					<TogglePublishBtn
						id={postId}
						published={published}
						onClick={() => {
							publishPostMutation.mutate({
								id: postId,
								published: !published
							});
						}}
					/>
					<EditPostBtn id={postId} />
					<CommentBtn onClick={() => onStartComment()} />
				</div>
				<div className="text-right">
					<DeletePostBtn
						show={!published}
						onConfirm={() =>
							deletePostMutation.mutate({
								id: postId
							})
						}
					/>
				</div>
			</div>
		</RequireAuth>
	);
}
