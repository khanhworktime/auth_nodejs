import { Request, RequestHandler, Response } from 'express';
import { User } from '../../models/user.model';
import UserDBO from '../../databases/user.database';
import { ResponseMessage } from '../../models/response.model';
import { generateTokens, Tokens } from '../../utils/generateTokens';
import { validatePassword } from '../../utils/validatePassword';

const responseNotFound: ResponseMessage<undefined> = {
    status: false,
    message: "User not found or doesn't exist",
};
const responseWrongCertification: ResponseMessage<undefined> = {
    status: false,
    message: 'User or password incorrect',
};
const responseSuccess: (tokens: Tokens) => ResponseMessage<Tokens> = (
    tokens: Tokens
): ResponseMessage<Tokens> => {
    return {
        status: false,
        message: 'Login success',
        data: tokens,
    };
};

export const loginController: RequestHandler = async (
    request: Request,
    response: Response
): Promise<Response | undefined> => {
    try {
        const { email, password }: Partial<User> = request.body;
        console.log(request.params);

        if (email === undefined || password === undefined)
            return response.sendStatus(400);

        const user: User | null = await UserDBO.getUserByEmail(email);

        if (user === null) return response.status(404).json(responseNotFound);

        const isPasswordCorrect: boolean = await validatePassword(
            password,
            user.password ?? ''
        );

        if (!isPasswordCorrect)
            return response.status(401).json(responseWrongCertification);

        const tokens: Tokens = generateTokens(user);

        await UserDBO.updateUser({
            id: user.id,
            refreshToken: tokens.refreshToken,
        });

        return response.status(200).json(responseSuccess(tokens));
    } catch (e) {
        console.log(e);
        return response.status(404).json(responseNotFound);
    }
};
