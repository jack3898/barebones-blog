import { ctxUser } from '@blog/backend';
import React, { createContext, useContext } from 'react';
import { trpc } from 'src/trpc';

type AuthContextProviderProps = {
	children: React.ReactNode;
};

type AuthContextValue = {
	loggedInUser: ctxUser | null;
};

const AuthContext = createContext({
	loggedInUser: {}
} as AuthContextValue);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const loggedInUser = trpc.useQuery(['loggedinuser']);

	const getLoggedInUser = () => {
		return loggedInUser.data || null;
	};

	const result = {
		loggedInUser: getLoggedInUser()
	};

	return <AuthContext.Provider value={result}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
