import { useSearchParamsContext } from '@blog/components/context';
import { Button } from '@blog/components/core';
import { useModal } from '@blog/components/modal';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CancelBtnProps = {
	onConfirm: () => void;
};

export function CancelBtn({ onConfirm }: CancelBtnProps) {
	const { modalToggle, modalUpdate } = useModal();
	const [, updateSearchParams] = useSearchParamsContext();

	return (
		<Button.Danger
			type="button"
			onClick={() => {
				modalUpdate({
					title: 'Discard changes',
					content: <p>Are you sure you want to discard your changes?</p>,
					footer: (
						<div className="flex gap-4">
							<Button.Primary onClick={() => modalToggle(false)}>No</Button.Primary>
							<Button.Danger
								onClick={() => {
									updateSearchParams('delete', 'edit');
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
			<FontAwesomeIcon icon={faTrash} />
		</Button.Danger>
	);
}
