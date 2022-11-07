import { Router } from "express";
import Mailer from "../controllers/Mailer";
import { userRouter } from "./user/userRoutes";

export const router = Router();

router.use('/user', userRouter);
router.post('/email', Mailer.sendEmail);
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
