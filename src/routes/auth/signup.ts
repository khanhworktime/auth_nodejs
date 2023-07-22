import { Router } from 'express';
import { signupController } from '../../controllers/auth';

const router: Router = Router();

router.post('/signup', signupController);

export const signupRouter: Router = router;
