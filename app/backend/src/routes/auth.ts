import { signJwt, verifyHash } from '@blog/utils';
import { User } from '@prisma/client';
import bodyParser from 'body-parser';
import express from 'express';
import client from '../../src/prisma';

const router = express.Router();

router.post('/', bodyParser.json(), async (req, res) => {
	const { username, password } = req.body as Record<any, string>;

	const user = (await client.user.findFirst({
		where: { username }
	})) as Omit<User, 'password'> & { password?: string };

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

	res.status(200);
	res.send();
});

router.delete('/', (req, res) => {
	res.clearCookie('auth', { path: '/' });
	res.status(200);
	res.send();
});

export default router;
