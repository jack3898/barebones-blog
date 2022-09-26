import { ROOT } from '@blog/constants/node';
import { rootenv } from '@blog/utils/node/rootenv';
import fs from 'fs';
import path from 'path';
import selfsigned from 'selfsigned';

rootenv();

let domain = process.env.PUB_HOST;

if (!domain) {
	console.error('No hostname detected! Exiting...');
	process.exit(1);
}

const attrs = [{ name: 'commonName', value: domain }];
const ssl = selfsigned.generate(attrs, {
	days: 365,
	algorithm: 'sha256',
	keySize: 2048
});

const { private: privateKey, cert } = ssl;

const sslDir = path.resolve(ROOT, 'dist', 'ssl');

fs.mkdirSync(sslDir, { recursive: true });
fs.writeFileSync(path.resolve(sslDir, 'privkey.pem'), privateKey, { flag: 'w' });
fs.writeFileSync(path.resolve(sslDir, 'fullchain.pem'), cert, { flag: 'w' });
