import { S3Storage } from "../utils/S3Storage";

class DeleteImageService {
    async execute(filename: string): Promise<void> {
        try {
            const s3 = new S3Storage();
            await s3.deleteFile(filename);
        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar a imagem!');
        }

    }
}

export default new DeleteImageService();