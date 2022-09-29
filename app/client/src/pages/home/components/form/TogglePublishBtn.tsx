import { Button } from '@blog/components/core';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TogglePublishBtnProps = {
	onClick: () => void;
	published: boolean;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'className'>;

export function TogglePublishBtn({ id, published, onClick, ...props }: TogglePublishBtnProps) {
	const ButtonType = published ? Button.Danger : Button.Success;

	return (
		<ButtonType {...props} onClick={() => onClick()}>
			{published ? (
				<FontAwesomeIcon icon={faEyeSlash} title="Un-publish post" />
			) : (
				<FontAwesomeIcon icon={faEye} title="Publish post" />
			)}
		</ButtonType>
	);
}
