import { useSearchParams } from 'react-router-dom';

type EditPostBtnProps = {
	id: string;
};

export function EditPostBtn({ id }: EditPostBtnProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<button
			className="primary"
			onClick={() => {
				searchParams.set('edit', id);
				setSearchParams(searchParams);
				window.location.reload(); // TODO: Find out how to remove this
			}}
		>
			Edit
		</button>
	);
}
