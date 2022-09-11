import { redis } from '../../redis';
import * as dotenv from 'dotenv';

dotenv.config();

export const confirmEmailLink = async (userId: number, newPassword: string) => {
  // const id = v4();
  await redis.set(newPassword, userId, 'ex', 60 * 60 * 15);

  return `${newPassword}`;
};
