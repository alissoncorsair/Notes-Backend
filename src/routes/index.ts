import { Router } from "express";
import { userRouter } from "./user/userRoutes";
import multer from "multer";
import { config } from "../config/config";
import UploadImageService from "../services/UploadImageService";
import { extractJWT } from "../middleware/extractJWT";

export const router = Router();
const upload = multer(config.multer);

/** depois vou apagar isso aqui */
router.use('/upload', extractJWT, upload.single('photo'), async (req, res) => {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    await UploadImageService.execute(file);
    res.status(200).json({ message: 'File uploaded successfully' });
});

router.use('/user', userRouter);
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
