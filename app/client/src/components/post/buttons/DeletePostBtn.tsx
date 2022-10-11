import { Button } from '@blog/components/core';
import { useModal } from '@blog/components/modal';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePost } from '../context/post';

type DeletePostBtnProps = {
	onConfirm: () => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'className'>;

export function DeletePostBtn({ onConfirm, ...btnProps }: DeletePostBtnProps) {
	const { modalToggle, modalUpdate } = useModal();
	const { ownsPost, published } = usePost();

	if (published || !ownsPost) return null;

	return (
		<Button.Danger
			{...btnProps}
			onClick={() => {
				modalUpdate({
					title: 'Delete post',
					content: (
						<p>
							Are you sure you want to delete this post? This will remove all attached
							comments and cannot be reversed!
						</p>
					),
					footer: (
						<div className="flex gap-4">
							<Button.Primary onClick={() => modalToggle(false)}>No</Button.Primary>

							<Button.Danger
								onClick={() => {
									onConfirm();
									modalToggle(false);
								}}
							>
								Yes
							</Button.Danger>
						</div>
					)
				});

				modalToggle(true);
			}}
		>
			<FontAwesomeIcon icon={faTrash} title="Delete post" />
		</Button.Danger>
	);
}
