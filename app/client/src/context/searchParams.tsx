import React, { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchParamsProviderProps = {
	children: React.ReactNode;
};

type AuthContextValue = Record<string, string | undefined>;

type SearchParamsUpdater = <M extends keyof URLSearchParams>(
	method: M,
	...params: Parameters<URLSearchParams[M]>
) => void;

const AuthContext = createContext<[AuthContextValue, SearchParamsUpdater]>([
	{},
	() => {
		console.error('Failed to update search params! Is there a provider?');
	}
]);

export function SearchParamsProvider({ children }: SearchParamsProviderProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeParams, setActiveParams] = useState<AuthContextValue>(
		Object.fromEntries(searchParams.entries())
	);

	const updateSearchParams: SearchParamsUpdater = (method, ...params) => {
		// @ts-ignore type checked before invoking so probably works
		searchParams[method]?.(...params);
		setSearchParams(searchParams);
		setActiveParams(Object.fromEntries(searchParams.entries()));
	};

	return (
		<AuthContext.Provider value={[activeParams, updateSearchParams]}>
			{children}
		</AuthContext.Provider>
	);
}

export const useSearchParamsContext = () => useContext(AuthContext);
