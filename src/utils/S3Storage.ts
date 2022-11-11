import aws, { S3 } from 'aws-sdk'
import path from 'path';
import { config } from '../config/config';
import mime from 'mime';
import fs from 'fs';


export class S3Storage {
    private client: S3;
    private bucket = 'noteawsbucket';

    constructor() {
        this.client = new aws.S3({
            region: 'sa-east-1',
        });
    }

    async saveFile(filename: string): Promise<void> {
        const originalPath = path.resolve(config.multer.directory, filename);
        
        const contentType = mime.getType(originalPath);

        if (!contentType) {
            throw new Error('File not found');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
            Bucket: this.bucket,
            Key: filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: contentType,
        })
        .promise();

        await fs.promises.unlink(originalPath);
    }

    async deleteFile(filename: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: this.bucket,
            Key: filename,
        })
        .promise();
    }

    getFile(filename: string): string {
        return `https://${this.bucket}.s3.amazonaws.com/${filename}`;
    }

}
