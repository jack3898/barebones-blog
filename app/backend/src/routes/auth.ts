import { signJwt } from '@blog/utils';
import bodyParser from 'body-parser';
import express from 'express';
import client from '../../src/prisma';

const router = express.Router();

router.post('/', bodyParser.json(), async (req, res) => {
	const { username, password } = req.body as Record<any, string>;

	const user = await client.user.findFirst({
		where: { username, password },
		select: { id: true, username: true, email: true, firstname: true, lastname: true }
	});

	if (!user) {
		res.sendStatus(404);
		return;
	}

	const token = signJwt(user);

	res.cookie('auth', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none'
	});

	res.status(200);
	res.send();
});

export default router;
