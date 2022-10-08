import { Button } from '@blog/components/core';
import { faReply } from '@fortawesome/free-solid-svg-icons/faReply';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CommentBtnProps = {
	onClick: () => void;
};

export function CommentBtn({ onClick }: CommentBtnProps) {
	return (
		<Button.Primary type="button" onClick={() => onClick()}>
			<FontAwesomeIcon icon={faReply} />
		</Button.Primary>
	);
}
