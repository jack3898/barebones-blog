import jwt from 'jsonwebtoken';
import { rootenv } from './rootenv';

rootenv();

type DecodeType<ProposedObject> = ProposedObject extends jwt.JwtPayload | string
	? ProposedObject
	: unknown;

export function verifyJwt(toVerify: string) {
	try {
		jwt.verify(toVerify, process.env.JWT_SECRET!);

		return true;
	} catch (error) {
		return false;
	}
}

export function decodeJwt<Object>(toDecode: string) {
	return jwt.verify(toDecode, process.env.JWT_SECRET!) as DecodeType<Object>;
}

export function signJwt(data: string | object | Buffer) {
	return jwt.sign(data, process.env.JWT_SECRET!);
}
