type TogglePublishBtnProps = {
	onClick: () => void;
	published: boolean;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'className'>;

export function TogglePublishBtn({ id, published, onClick, ...props }: TogglePublishBtnProps) {
	return (
		<button {...props} className={published ? 'danger' : 'success'} onClick={() => onClick()}>
			{published ? 'Un-publish' : 'Publish'}
		</button>
	);
}
