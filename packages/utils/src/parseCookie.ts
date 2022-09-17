export function parseCookie<TKeys extends string = string>(
	cookie?: string
): Record<TKeys, string> | null {
	if (!cookie) return null;

	return cookie.split('; ').reduce((acc: Record<string, string>, cur: string) => {
		const [key, value] = cur.split('=');
		return Object.assign(acc, { [key]: value });
	}, {});
}
