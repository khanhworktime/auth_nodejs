import { Request, RequestHandler, Response } from 'express';
import UserDBO from '../../databases/user.database';

export const getAllUsersController: RequestHandler = async (
    request: Request,
    response: Response
) => {
    const users = await UserDBO.getUsers();
    response.send(users);
};
