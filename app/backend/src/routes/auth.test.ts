import { parseCookie } from '@blog/utils/both/parseCookie';
import { verifyHcaptchaToken } from '@blog/utils/node/hcaptcha';
import { decodeJwt } from '@blog/utils/node/jwt';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import request from 'supertest';
import server from '../express';
import client from '../prisma';

jest.mock('@blog/utils/node/hcaptcha', () => ({
	__esModule: true,
	verifyHcaptchaToken: jest.fn()
}));

jest.mock('../prisma', () => ({
	__esModule: true,
	default: mockDeep()
}));

beforeEach(() => {
	mockReset(prismaMock);
});

const verifyHcaptchaTokenMock = jest.mocked(verifyHcaptchaToken);
const prismaMock = client as unknown as DeepMockProxy<PrismaClient>;

describe('/auth', () => {
	it('should result to HTTP 400 on invalid captcha', async () => {
		verifyHcaptchaTokenMock.mockResolvedValue({ success: false, 'error-codes': [] });

		const response = await request(server()).post('/auth');

		expect(response.statusCode).toBe(400);
	});

	it('should result to HTTP 401 on no user being found', async () => {
		prismaMock.user.findFirst.mockResolvedValue(null);
		verifyHcaptchaTokenMock.mockResolvedValue({ success: true });

		const response = await request(server()).post('/auth');

		expect(response.statusCode).toBe(401);
	});

	it('should query for the user via their username', async () => {
		verifyHcaptchaTokenMock.mockResolvedValue({ success: true });
		prismaMock.user.findFirst.mockResolvedValue({
			id: 'id',
			email: 'email',
			created: new Date(),
			admin: true,
			firstname: 'firstname',
			lastname: 'lastname',
			username: 'username',
			password: process.env.TEST_HASH! // is password123
		});

		await request(server()).post('/auth').send({
			username: 'username',
			password: 'password123'
		});

		expect(prismaMock.user.findFirst).toBeCalledWith({ where: { username: 'username' } });
	});

	it('should result to HTTP 200 on successful login', async () => {
		verifyHcaptchaTokenMock.mockResolvedValue({ success: true });
		prismaMock.user.findFirst.mockResolvedValue({
			id: 'id',
			email: 'email',
			created: new Date(),
			admin: true,
			firstname: 'firstname',
			lastname: 'lastname',
			username: 'username',
			password: process.env.TEST_HASH! // is password123
		});

		const response = await request(server()).post('/auth').send({
			username: 'username',
			password: 'password123'
		});

		expect(response.statusCode).toBe(200);
	});

	it('should send a cookie with the correct security policy as a response', async () => {
		verifyHcaptchaTokenMock.mockResolvedValue({ success: true });
		prismaMock.user.findFirst.mockResolvedValue({
			id: 'id',
			email: 'email',
			created: new Date(),
			admin: true,
			firstname: 'firstname',
			lastname: 'lastname',
			username: 'username',
			password: process.env.TEST_HASH! // is password123
		});

		const {
			headers: {
				'set-cookie': [cookieHeader]
			}
		} = await request(server()).post('/auth').send({
			username: 'username',
			password: 'password123'
		});

		expect(cookieHeader).toContain('Secure;');
		expect(cookieHeader).toContain('HttpOnly;');
		expect(cookieHeader).toContain('SameSite=Lax');
	});

	it('must delete the password from the signed JWT', async () => {
		verifyHcaptchaTokenMock.mockResolvedValue({ success: true });
		prismaMock.user.findFirst.mockResolvedValue({
			id: 'id',
			email: 'email',
			created: new Date(),
			admin: true,
			firstname: 'firstname',
			lastname: 'lastname',
			username: 'username',
			password: process.env.TEST_HASH! // is password123
		});

		const {
			headers: {
				'set-cookie': [cookieHeader]
			}
		} = await request(server()).post('/auth').send({
			username: 'username',
			password: 'password123'
		});

		const parsedCookie = parseCookie(cookieHeader);
		const decodedJwt = decodeJwt(parsedCookie?.auth!);

		expect(decodedJwt).not.toHaveProperty('password');
		expect(decodedJwt).toHaveProperty('username');
	});

	it('should send HTTP 401 on error', async () => {
		verifyHcaptchaTokenMock.mockResolvedValue({ success: true });
		prismaMock.user.findFirst.mockRejectedValue('Test error for test runner');

		const response = await request(server()).post('/auth').send({
			username: 'username',
			password: 'password123'
		});

		expect(response.statusCode).toBe(401);
	});
});
