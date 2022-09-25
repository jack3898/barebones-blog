import { useModal } from '@blog/components/modal';

type DeletePostBtnProps = {
	show: boolean;
	onConfirm: () => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'className'>;

export function DeletePostBtn({ show, onConfirm, ...btnProps }: DeletePostBtnProps) {
	const { modalToggle, modalUpdate } = useModal();

	if (!show) return null;

	return (
		<button
			className="danger"
			{...btnProps}
			onClick={() => {
				modalUpdate({
					title: 'Confirmation',
					content: (
						<p>Are you sure you want to delete this post? You cannot undo this!</p>
					),
					footer: (
						<div className="flex gap-4">
							<button className="primary" onClick={() => modalToggle(false)}>
								No
							</button>
							<button
								className="danger"
								onClick={() => {
									onConfirm();
									modalToggle(false);
								}}
							>
								Yes
							</button>
						</div>
					)
				});

				modalToggle(true);
			}}
		>
			Delete
		</button>
	);
}
