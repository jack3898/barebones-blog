import { useModal } from '@blog/components/modal';
import { useSearchParamsContext } from 'src/context/searchParams';

type EditPostBtnProps = {
	id: string;
};

export function EditPostBtn({ id }: EditPostBtnProps) {
	const [searchParams, updateSearchParams] = useSearchParamsContext();
	const { modalToggle, modalUpdate } = useModal();

	if (searchParams.edit === id) return null;

	return (
		<button
			className="primary"
			onClick={() => {
				if (searchParams.edit) {
					modalUpdate({
						title: 'Confirmation',
						content: <p>You are already editing something else. Discard changes?</p>,
						footer: (
							<div className="flex gap-4 justify-end">
								<button className="primary" onClick={() => modalToggle(false)}>
									No
								</button>
								<button
									className="danger"
									onClick={() => {
										updateSearchParams('set', 'edit', id);
										modalToggle(false);
									}}
								>
									Yes
								</button>
							</div>
						)
					});

					modalToggle(true);

					return;
				}

				updateSearchParams('set', 'edit', id);
			}}
		>
			Edit
		</button>
	);
}
