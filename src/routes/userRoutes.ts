import { Router } from 'express';
import multer from 'multer';
import { config } from '../config/config';

import UserController from '../controllers/UserController';
import { extractJWT } from '../middleware/extractJWT';

export const userRouter = Router();

const upload = multer(config.multer);

userRouter.get('/', extractJWT, UserController.index);
userRouter.post('/', upload.single('photo'), UserController.register);
userRouter.put('/', extractJWT, upload.single('photo'), UserController.update);
userRouter.post('/login', UserController.login);
userRouter.post('/refresh-token', UserController.token);