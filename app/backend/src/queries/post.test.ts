import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import client from '../prisma';
import { postRouter } from './post';

jest.mock('../prisma', () => ({
	__esModule: true,
	default: mockDeep()
}));

const prismaMock = client as unknown as DeepMockProxy<PrismaClient>;

let caller: ReturnType<typeof postRouter['createCaller']>;

beforeEach(() => {
	mockReset(prismaMock);
});

describe('post.delete', () => {
	it('should prevent unauthorised users from deleting posts', () => {
		const loggedInUser = null;

		// @ts-ignore
		caller = postRouter.createCaller({ db: prismaMock, loggedInUser });

		const response = caller.mutation('post.delete', { id: 'id' });

		expect(response).rejects.toBeInstanceOf(TRPCError);
		expect(response).rejects.toStrictEqual(expect.objectContaining({ code: 'UNAUTHORIZED' }));
	});

	it('should include the user in the query', async () => {
		const loggedInUser = { id: 'userid' };

		// @ts-ignore
		caller = postRouter.createCaller({ db: prismaMock, loggedInUser });

		await caller.mutation('post.delete', { id: 'id' });

		expect(prismaMock.post.deleteMany).toHaveBeenCalledWith(
			expect.objectContaining({ where: expect.objectContaining({ userId: 'userid' }) })
		);
	});

	it('should return a count on success', async () => {
		const loggedInUser = { id: 'userid' };

		// @ts-ignore
		prismaMock.post.deleteMany.mockReturnValue(Promise.resolve({ count: 1 }));

		// @ts-ignore
		caller = postRouter.createCaller({ db: prismaMock, loggedInUser });

		const response = caller.mutation('post.delete', { id: 'id' });

		expect(response).resolves.toStrictEqual({ count: 1 });
	});
});

describe('post.setpublish', () => {
	it('should prevent unauthorised users from changing publish status', () => {
		const loggedInUser = false;

		// @ts-ignore
		caller = postRouter.createCaller({ db: prismaMock, loggedInUser });

		// @ts-ignore
		prismaMock.post.deleteMany.mockReturnValue(Promise.resolve({ count: 1 }));

		const response = caller.mutation('post.setpublish', { id: 'id', published: false });

		expect(response).rejects.toBeInstanceOf(TRPCError);
		expect(response).rejects.toStrictEqual(expect.objectContaining({ code: 'UNAUTHORIZED' }));
	});

	it('should return the data when successful', () => {
		const loggedInUser = { id: 'userid' };

		// @ts-ignore
		prismaMock.post.updateMany.mockReturnValue(Promise.resolve({ count: 1 }));

		// @ts-ignore
		caller = postRouter.createCaller({ db: prismaMock, loggedInUser });

		const response = caller.mutation('post.setpublish', { id: 'id', published: true });

		expect(response).resolves.toStrictEqual({ count: 1 });
	});
});

describe('post.create', () => {
	it.todo('should prevent unauthorised users from creating posts');

	it.todo('should return the created post when successful');
});

describe('post.update', () => {
	it.todo('should prevent unauthorised users from creating posts');

	it.todo('should return the updated post when successful');
});
