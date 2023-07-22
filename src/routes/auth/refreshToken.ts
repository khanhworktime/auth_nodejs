import { Router } from 'express';
import { refreshTokenController } from '../../controllers/auth/refreshToken.controller';

const router: Router = Router();

router.post('/refreshToken', refreshTokenController);

export const refreshTokenRouter: Router = router;
