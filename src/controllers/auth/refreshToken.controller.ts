import { Request, RequestHandler, Response } from 'express';
import { ResponseMessage } from '../../models/response.model';
import { generateTokens, Tokens } from '../../utils/generateTokens';
import UserDBO from '../../databases/user.database';
import * as jwt from 'jsonwebtoken';

const responseNotFound: ResponseMessage<undefined> = {
    status: false,
    message: "Refresh token not found or doesn't exist",
};
const responseSuccess: (tokens: Tokens) => ResponseMessage<Tokens> = (
    tokens: Tokens
): ResponseMessage<Tokens> => {
    return {
        status: false,
        message: 'Token refreshed',
        data: tokens,
    };
};

export const refreshTokenController: RequestHandler = async (
    request: Request,
    response: Response
) => {
    const { refreshToken } = request.body;
    if (refreshToken === undefined || refreshToken === null)
        return response.status(400).json(responseNotFound);
    try {
        const user = await UserDBO.getUserByRefreshToken(refreshToken);

        if (user === null) return response.status(401).json(responseNotFound);

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET_KEY ?? ''
        );

        const tokens: Tokens = generateTokens(user);

        await UserDBO.updateUser({
            id: user.id,
            refreshToken: tokens.refreshToken,
        });

        return response.status(200).json(responseSuccess(tokens));
    } catch (e) {
        console.log(e);
        return response.status(401).json(responseNotFound);
    }
};
