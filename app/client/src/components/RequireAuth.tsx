import { useAuthContext } from 'src/context';

type AuthenticatedProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	mode?: boolean;
};

export function RequireAuth({ children, fallback = null, mode = true }: AuthenticatedProps) {
	const { loggedInUser } = useAuthContext();

	if (!!loggedInUser === !!mode) return <>{children}</>;

	return <>{fallback}</>;
}
