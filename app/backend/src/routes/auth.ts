import { verifyHash } from '@blog/utils/node/hash';
import { verifyHcaptchaToken } from '@blog/utils/node/hcaptcha';
import { signJwt } from '@blog/utils/node/jwt';
import { User } from '@prisma/client';
import bodyParser from 'body-parser';
import express from 'express';
import client from '../../src/prisma';

const router = express.Router();

router.post('/', bodyParser.json(), async (req, res) => {
	try {
		const { username, password, captchaToken } = req.body as Record<any, string>;
		const { success: hcaptchaSuccess } = await verifyHcaptchaToken(captchaToken);

		if (!hcaptchaSuccess) {
			res.status(400);
			res.send('Invalid captcha');
			return;
		}

		const query = client.user.findFirst({ where: { username } });
		const user = (await query) as Omit<User, 'password'> & { password?: string };
		const authenticated = await verifyHash(password, user?.password);

		if (!user || !authenticated) {
			res.sendStatus(401);
			return;
		}

		delete user.password; // Don't want this being added to the token! 😬

		const token = signJwt(user);

		res.cookie('auth', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		});

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(401);
		console.error(error);
	}
});

router.delete('/', (req, res) => {
	try {
		res.clearCookie('auth', { path: '/' });
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(200);
	}
});

export default router;
