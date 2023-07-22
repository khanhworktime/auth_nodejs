import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const verifyTokenMiddleware: RequestHandler = (
    request: Request,
    response: Response,
    next: NextFunction
): Response | undefined => {
    const authHeader: string | undefined = request.header('Authorization');
    const token: string | undefined = authHeader && authHeader?.split(' ')[1];

    if (token === undefined) return response.sendStatus(401);

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY ?? '');
        next();
    } catch (e) {
        console.log(e);
        return response.sendStatus(401);
    }
};
