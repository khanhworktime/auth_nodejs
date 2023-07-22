import { Router } from 'express';
import { getAllUsersController } from '../../controllers/users';
import { verifyTokenMiddleware } from '../../middlewares/auth/auth';

const router: Router = Router();

router.get('/users', verifyTokenMiddleware, getAllUsersController);

export const getAllUserRouter: Router = router;
