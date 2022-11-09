import { S3Storage } from "../utils/S3Storage";

class UploadImageService {
    async execute(file: Express.Multer.File): Promise<void> {
        const upload = new S3Storage();
        await upload.saveFile(file.filename);
    }
}

export default new UploadImageService();