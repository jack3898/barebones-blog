import { RequireAuth } from '@blog/components/core';
import { useState } from 'react';
import { CommentComposer } from './CommentComposer';

type PostCommentSectionProps = {
	comments: Comment[];
	isReply?: boolean;
	replying?: boolean;
};

type Comment = {
	id: string;
	author?: Author | null;
	content: string;
	replies?: Comment[] | null;
	postId: string;
};

type Author = {
	firstname: string;
	lastname: string;
};

export function CommentSection({ comments, isReply = false }: PostCommentSectionProps) {
	const [replyingWithId, setReplyingId] = useState('');

	if (!comments.length) {
		return null;
	}

	return (
		<ul className={`${!isReply ? 'border-t' : 'border-l'}`}>
			{comments?.map(({ id, author, content, replies, postId }) => {
				const editing = replyingWithId === id;

				return (
					<li key={id} className={`${isReply ? 'pl-4' : ''}`}>
						<article>
							<div
								className={`mt-4 ${
									editing ? 'block' : 'flex gap-4 justify-between'
								}`}
							>
								<div className="grid gap-4">
									<div>
										<strong>
											{author
												? `${author.firstname} ${author.lastname}`
												: 'Anonymous'}
										</strong>
										: {content}
									</div>
									{editing && (
										<CommentComposer
											parentId={id}
											postId={postId}
											onCancel={() => setReplyingId('')}
											placeholder={`What do you want to say to ${author?.firstname}'s comment?`}
										/>
									)}
								</div>
								{!editing && !isReply && (
									<RequireAuth>
										<small>
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													setReplyingId(id);
												}}
											>
												Reply
											</a>
										</small>
									</RequireAuth>
								)}
							</div>
							{replies && <CommentSection comments={replies} isReply={true} />}
						</article>
					</li>
				);
			})}
		</ul>
	);
}
