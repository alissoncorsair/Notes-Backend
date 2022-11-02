import { Router } from 'express';

import UserController from '../../controllers/User';

export const userRouter = Router();

userRouter.get('/', UserController.index);
userRouter.post('/', UserController.create);
userRouter.post('/login', UserController.login);