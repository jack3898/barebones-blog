import { rootenv } from './rootenv';

rootenv();

type HCaptchaResponse = {
	success: boolean;
	challenge_ts?: string;
	hostname?: string;
	credit?: boolean;
	'error-codes'?: string[];
	score?: number;
	score_reason?: string[];
};

export async function verifyHcaptchaToken(token: string): Promise<HCaptchaResponse> {
	try {
		// HCaptcha does not seem to like JSON payloads :(
		const formData = new FormData();

		formData.append('secret', process.env.HCAPTCHA_SECRET!);
		formData.append('response', token);

		const response = await fetch('https://hcaptcha.com/siteverify', {
			method: 'POST',
			headers: { 'Encoding-Type': 'multipart/form-data' },
			body: formData
		});

		return response.json();
	} catch (error) {
		console.error(error);

		return { success: false };
	}
}
