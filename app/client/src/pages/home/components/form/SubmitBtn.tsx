import { Button } from '@blog/components/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SubmitBtn() {
	return (
		<Button.Success type="submit">
			<FontAwesomeIcon icon={faCheck} />
		</Button.Success>
	);
}
