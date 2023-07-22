import { Request, RequestHandler, Response } from 'express';
import { User } from '../../models/user.model';
import { ResponseMessage } from '../../models/response.model';
import UserDBO from '../../databases/user.database';
import { hashPassword } from '../../utils/hashPassword';

const responseMissingField: ResponseMessage<undefined> = {
    status: false,
    message: 'Some required fields are missing',
};
const responseUserExisted: ResponseMessage<undefined> = {
    status: false,
    message: 'User is existed',
};
const responseSuccess: (
    user: Partial<User>
) => ResponseMessage<Partial<User>> = (
    user: Partial<User>
): ResponseMessage<Partial<User>> => {
    return {
        status: false,
        message: 'User registered success',
        data: user,
    };
};

export const signupController: RequestHandler = async (
    request: Request,
    response: Response
) => {
    const { email, password }: Pick<User, 'email' | 'password'> = request.body;
    try {
        if (email === undefined || password === undefined)
            return response.status(401).json(responseMissingField);

        const userCheck = await UserDBO.getUserByEmail(email);
        if (userCheck !== null)
            return response.status(401).json(responseUserExisted);

        const hashedPassword = await hashPassword(password);
        const newUser = await UserDBO.createUser(email, hashedPassword);

        if (newUser !== null)
            return response.status(200).json(responseSuccess(newUser));

        return response.sendStatus(500);
    } catch (e) {
        console.log(e);
        return response.status(500);
    }
};
