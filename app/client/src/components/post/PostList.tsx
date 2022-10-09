import { trpc } from '@blog/components/context';
import { Markdown, Post } from '@blog/components/core';
import { DATE_TIME } from '@blog/constants/browser';
import { format } from 'date-fns';
import { useState } from 'react';
import { CommentSection } from 'src/components/post/CommentSection';
import { useInitialInfinitePostsQueryParams } from 'src/trpc-hooks';
import { CommentComposer } from './CommentComposer';
import { Controls } from './Controls';

export function PostList() {
	const [commentingId, setCommentingId] = useState('');
	const trpcUtils = trpc.useContext();

	const postsResponse = trpcUtils.getInfiniteQueryData([
		'post.many',
		useInitialInfinitePostsQueryParams
	]);

	if (!postsResponse?.pages) return null;

	const posts = postsResponse.pages.flatMap(({ items }) => items);

	if (!posts.length) {
		return <p className="text-center">Nothing here yet 😔</p>;
	}

	return (
		<>
			{posts.map(
				({
					id,
					content,
					created,
					published,
					author: { firstname, lastname },
					comments
				}) => (
					<Post
						key={id}
						content={<Markdown>{content}</Markdown>}
						created={format(new Date(created), DATE_TIME)}
						author={`${firstname} ${lastname}`}
						footer={
							<div className="grid gap-4">
								<Controls
									postId={id}
									published={published}
									onStartComment={() => setCommentingId(id)}
								/>
								{commentingId === id && (
									<CommentComposer
										postId={id}
										onCancel={() => setCommentingId('')}
										placeholder={`What do you think of ${firstname}'s post?`}
										onSuccess={() => setCommentingId('')}
									/>
								)}
								<CommentSection comments={comments} />
							</div>
						}
					/>
				)
			)}
		</>
	);
}
