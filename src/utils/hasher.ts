import * as bcrypt from 'bcrypt';

export async function generateSalt(): Promise<string> {
  return await bcrypt.genSalt();
}

export async function hasher(password: string, salt: string): Promise<string> {
  return await bcrypt.hash(password, salt);
}
