import { ctxUser } from '@blog/backend';
import { trpc } from '@blog/components/trpc';
import React, { createContext, useContext } from 'react';

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
	const loggedInUser = trpc.useQuery(['user.loggedin']);

	const getLoggedInUser = () => {
		return loggedInUser.data || null;
	};

	const result = {
		loggedInUser: getLoggedInUser()
	};

	return <AuthContext.Provider value={result}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
