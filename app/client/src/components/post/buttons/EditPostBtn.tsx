import { useSearchParamsContext } from '@blog/components/context';
import { Button } from '@blog/components/core';
import { useModal } from '@blog/components/modal';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePost } from '../context/post';

type EditPostBtnProps = {
	id: string;
};

export function EditPostBtn({ id }: EditPostBtnProps) {
	const [searchParams, updateSearchParams] = useSearchParamsContext();
	const { modalToggle, modalUpdate } = useModal();
	const { ownsPost } = usePost();

	if (searchParams.edit === id || !ownsPost) return null;

	return (
		<Button.Primary
			onClick={() => {
				if (searchParams.edit) {
					modalUpdate({
						title: 'Discard other edit',
						content: <p>You are already editing something else. Discard changes?</p>,
						footer: (
							<div className="flex gap-4">
								<Button.Primary onClick={() => modalToggle(false)}>
									No
								</Button.Primary>
								<Button.Danger
									onClick={() => {
										updateSearchParams('set', 'edit', id);
										modalToggle(false);
									}}
								>
									Yes
								</Button.Danger>
							</div>
						)
					});

					modalToggle(true);

					return;
				}

				updateSearchParams('set', 'edit', id);
			}}
		>
			<FontAwesomeIcon icon={faEdit} title="Edit post" />
		</Button.Primary>
	);
}
