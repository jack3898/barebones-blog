import { ctxUser } from '@blog/backend';
import React, { createContext, useContext } from 'react';
import { trpc } from './trpc';

type AuthContextProviderProps = {
	children: React.ReactNode;
};

type AuthContextValue = {
	loggedInUser: ctxUser | null;
};

const AuthContext = createContext({
	loggedInUser: {}
} as AuthContextValue);

export function AuthProvider({ children }: AuthContextProviderProps) {
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
