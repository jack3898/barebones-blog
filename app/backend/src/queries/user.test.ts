import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import client from '../prisma';
import { userRouter } from './user';

jest.mock('../prisma', () => ({
	__esModule: true,
	default: mockDeep()
}));

const prismaMock = client as unknown as DeepMockProxy<PrismaClient>;

let caller: ReturnType<typeof userRouter['createCaller']>;

beforeEach(() => {
	mockReset(prismaMock);
	// @ts-ignore
	caller = userRouter.createCaller({ db: prismaMock });
});

describe('user.createfirst mutation', () => {
	it('should return HTTP 400 when a user already exists in the database', async () => {
		// @ts-ignore
		prismaMock.user.findFirst.mockResolvedValue(true);

		const mutation = caller.mutation('user.createfirst', {
			email: 'email@email.com',
			firstname: 'firstname',
			lastname: 'lastname',
			password: 'password',
			username: 'username'
		});

		expect(mutation).rejects.toBeInstanceOf(TRPCError);
		expect(mutation).rejects.toStrictEqual(expect.objectContaining({ code: 'BAD_REQUEST' }));
	});

	it('should return the created user when a user does not exist', async () => {
		// @ts-ignore
		prismaMock.user.findFirst.mockResolvedValue(null);
		// @ts-ignore
		prismaMock.user.create.mockResolvedValue({ username: 'username' });

		const mutation = await caller.mutation('user.createfirst', {
			email: 'email@email.com',
			firstname: 'firstname',
			lastname: 'lastname',
			password: 'password',
			username: 'username'
		});

		expect(mutation).toEqual({ username: 'username' });
	});
});

describe('user.dbhasone query', () => {
	it('should return true if the db has a user', () => {
		// @ts-ignore
		prismaMock.user.findFirst.mockResolvedValue({ id: 'id' });

		const query = caller.query('user.dbhasone');

		expect(query).resolves.toStrictEqual({ exists: true });
	});

	it('should return false if the db does not have a user', () => {
		// @ts-ignore
		prismaMock.user.findFirst.mockResolvedValue(null);

		const query = caller.query('user.dbhasone');

		expect(query).resolves.toStrictEqual({ exists: false });
	});
});
