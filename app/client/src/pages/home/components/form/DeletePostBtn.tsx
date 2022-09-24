type DeletePostBtnProps = {
	show: boolean;
	onClick: () => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'className'>;

export function DeletePostBtn({ show, onClick, ...btnProps }: DeletePostBtnProps) {
	if (!show) return null;

	return (
		<button
			className="danger"
			{...btnProps}
			onClick={() => {
				// TODO: Replace with modal
				const shouldDelete = confirm(
					'Are you sure you want to delete this post? You cannot undo this!'
				);

				if (!shouldDelete) return;

				onClick();
			}}
		>
			Delete
		</button>
	);
}
