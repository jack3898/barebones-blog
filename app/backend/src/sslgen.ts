import { ROOT } from '@blog/constants/node';
import { rootenv } from '@blog/utils/node/rootenv';
import fs from 'fs';
import path from 'path';
import selfsigned from 'selfsigned';

rootenv();

const domain = process.env.PUB_HOST;
export const sslDir = path.resolve(ROOT, 'dist', 'ssl');

export function sslGen() {
	if (!domain) {
		console.error('No hostname detected! Aborting self-signed SSL generation...');
		return;
	}

	const privKeyDest = path.resolve(sslDir, 'privkey.pem');
	const publicKeyDest = path.resolve(sslDir, 'fullchain.pem');

	if (fs.existsSync(privKeyDest) || fs.existsSync(publicKeyDest)) {
		console.error('SSL detected! Aborting self-signed SSL generation...');
		return;
	}

	const attrs = [{ name: 'commonName', value: domain }];
	const ssl = selfsigned.generate(attrs, {
		days: 365,
		algorithm: 'sha256',
		keySize: 2048
	});

	const { private: privateKey, cert } = ssl;

	fs.existsSync(sslDir) || fs.mkdirSync(sslDir, { recursive: true });

	fs.writeFileSync(privKeyDest, privateKey);
	fs.writeFileSync(publicKeyDest, cert);
}
