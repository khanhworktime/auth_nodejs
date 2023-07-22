import { Router } from 'express';
import { loginController } from '../../controllers/auth';

const router: Router = Router();

router.post('/login', loginController);

export const loginRouter: Router = router;
