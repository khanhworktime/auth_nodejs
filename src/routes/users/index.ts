import { Router } from 'express';
import { getAllUserRouter } from './get';

const routes: Router = Router();
routes.use(getAllUserRouter);

export const usersRouter = routes;
