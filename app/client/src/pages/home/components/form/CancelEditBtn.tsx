type CancelEditBtn = {
	callback: () => void;
};

export function CancelEditBtn({ callback }: CancelEditBtn) {
	return (
		<button className="danger" type="button" onClick={() => callback()}>
			Cancel
		</button>
	);
}
