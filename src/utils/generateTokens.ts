import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export function generateTokens(user: User): Tokens {
    const { id, email }: User = user;
    const accessToken = jwt.sign(
        { id, email },
        process.env.JWT_SECRET_KEY ?? '',
        {
            expiresIn: '10s',
        }
    );
    const refreshToken = jwt.sign(
        { id, email },
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY ?? '',
        {
            expiresIn: '1h',
        }
    );

    return { accessToken, refreshToken };
}
