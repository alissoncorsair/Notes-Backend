import { Router } from "express";
import { userRouter } from "./user/userRoutes";

export const router = Router();

router.use('/user', userRouter);
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
