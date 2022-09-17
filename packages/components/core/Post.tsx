type PostProps = {
	title: string;
	content: string;
	created: string;
	author: string;
};

export function Post({ title, content, created, author }: PostProps) {
	return (
		<article className="bg-white p-4 rounded shadow grid gap-4">
			<h2>{title}</h2>
			<div>{content}</div>
			<small>
				By {author}, {created}
			</small>
		</article>
	);
}
