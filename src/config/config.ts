import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

dotenv.config();

const DATABASE_USERNAME = process.env.MONGO_USERNAME;
const DATABASE_PASSWORD = process.env.MONGO_PASSWORD;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'abrobra';
const SERVER_REFRESH_TOKEN_SECRET = process.env.SERVER_REFRESH_TOKEN_SECRET || 'abacate';
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

export const config = {
    DATABASE_URL: `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@node-js.khm1gei.mongodb.net/?retryWrites=true&w=majority`,
    PORT: process.env.SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET,
        refresh_secret: SERVER_REFRESH_TOKEN_SECRET
    },
    mail: {
        user: MAIL_USER,
        pass: MAIL_PASS
    },
    redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD
    },
    multer: {
        directory: tmpFolder,
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(req, file, cb) {
                const fileHash = crypto.randomBytes(10).toString('hex');

                const fileName = `${fileHash}-${file.originalname}`;

                return cb(null, fileName);
            }
        }),
    }
}