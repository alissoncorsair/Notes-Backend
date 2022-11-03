import { Router } from 'express';

import UserController from '../../controllers/User';
import { extractJWT } from '../../middleware/extractJWT';

export const userRouter = Router();

userRouter.get('/', extractJWT, UserController.index);
userRouter.post('/', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/validate', extractJWT);
userRouter.post('/generate', UserController.generate);