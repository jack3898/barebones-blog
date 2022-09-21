import { useSearchParamsContext } from 'src/context/searchParams';

type EditPostBtnProps = {
	id: string;
};

export function EditPostBtn({ id }: EditPostBtnProps) {
	const [searchParams, updateSearchParams] = useSearchParamsContext();

	if (searchParams.edit === id) return null;

	return (
		<button className="primary" onClick={() => updateSearchParams('set', 'edit', id)}>
			Edit
		</button>
	);
}
