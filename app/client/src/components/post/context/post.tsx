import { useAuthContext } from '@blog/components/context';
import { createContext, useContext } from 'react';

const PostContext = createContext({
	postId: '',
	authorUsername: '',
	published: false,
	ownsPost: false
});

type PostProviderProps = {
	children: React.ReactNode;
	postId: string;
	authorUsername: string;
	published: boolean;
};

export function PostProvider({ children, postId, published, authorUsername }: PostProviderProps) {
	const { loggedInUser } = useAuthContext();
	const ownsPost = authorUsername === loggedInUser?.username;

	return (
		<PostContext.Provider
			value={{
				postId,
				authorUsername,
				published,
				ownsPost
			}}
		>
			{children}
		</PostContext.Provider>
	);
}

export const usePost = () => useContext(PostContext);
