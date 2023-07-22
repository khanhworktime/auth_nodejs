import { Router } from 'express';
import { loginRouter } from './login';
import { signupRouter } from './signup';
import { refreshTokenRouter } from './refreshToken';

const routes: Router = Router();
routes.use(loginRouter);
routes.use(signupRouter);
routes.use(refreshTokenRouter);

export const authRoutes = routes;
