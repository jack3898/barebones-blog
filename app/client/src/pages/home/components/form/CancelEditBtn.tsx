import { useModal } from '@blog/components/modal';
import { useSearchParamsContext } from 'src/context/searchParams';

type CancelEditBtnProps = {
	onConfirm: () => void;
};

export function CancelEditBtn({ onConfirm }: CancelEditBtnProps) {
	const { modalToggle, modalUpdate } = useModal();
	const [searchParams, updateSearchParams] = useSearchParamsContext();

	return (
		<button
			className="danger"
			type="button"
			onClick={() => {
				modalUpdate({
					title: 'Confirmation',
					content: <p>Are you sure you want to discard your changes?</p>,
					footer: (
						<div className="flex gap-4 justify-end">
							<button className="primary" onClick={() => modalToggle(false)}>
								No
							</button>
							<button
								className="danger"
								onClick={() => {
									updateSearchParams('delete', 'edit');
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
			Cancel
		</button>
	);
}
