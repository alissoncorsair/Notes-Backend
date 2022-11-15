import { Router } from "express";
import { userRouter } from "./userRoutes";
import { notesRouter } from "./notesRoutes";


export const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'tô funcionando!' });
});
router.use('/user', userRouter);
router.use('/notes', notesRouter)
