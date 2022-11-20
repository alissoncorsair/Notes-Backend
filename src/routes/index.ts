import { Router } from "express";
import { userRouter } from "./userRoutes";
import { notesRouter } from "./notesRoutes";
import UserController from "../controllers/UserController";

export const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'tô funcionando!' });
});
router.post('/login', UserController.login);
router.post('/token', UserController.token);
router.use('/user', userRouter);
router.use('/notes', notesRouter)
