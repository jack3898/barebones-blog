import bcrypt from 'bcryptjs';

export async function createHash(text: string): Promise<string> {
	const salt = await bcrypt.genSalt(11);
	const hashedPassword = await bcrypt.hash(text, salt);

	return hashedPassword;
}

export function verifyHash(subject?: string, hash?: string): Promise<boolean> {
	return bcrypt.compare(String(subject), String(hash));
}
