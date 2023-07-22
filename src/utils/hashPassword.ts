import bcrypt from 'bcrypt';

const hashRound: 10 = 10;

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(hashRound);
    return await bcrypt.hash(password, salt);
}
