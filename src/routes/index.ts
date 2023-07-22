import { Router } from 'express';
import { authRoutes } from './auth';
import { usersRouter } from './users';

const appRoutes: Router = Router();
appRoutes.use(authRoutes);
appRoutes.use(usersRouter);
export default appRoutes;
