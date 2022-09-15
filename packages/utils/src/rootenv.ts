import { ROOT } from '@blog/constants';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Automatically update node's `process.env` with environment variables found at the root `.env`
 */
export const rootenv = () => dotenv.config({ path: path.resolve(ROOT, '.env') });
