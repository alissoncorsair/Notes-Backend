import { S3Storage } from "../utils/S3Storage";

class UploadImageService {
    async execute(file: Express.Multer.File): Promise<void> {
        try {
            const upload = new S3Storage();
            await upload.saveFile(file.filename);
        } catch (error) {
            throw new Error('Ocorreu um erro ao salvar a imagem!');
        }
        
    }
}

export default new UploadImageService();