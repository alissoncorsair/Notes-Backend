import dotenv from 'dotenv';

dotenv.config();

const DATABASE_USERNAME = process.env.MONGO_USERNAME;
const DATABASE_PASSWORD = process.env.MONGO_PASSWORD;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'abrobra';
const SERVER_REFRESH_TOKEN_SECRET = process.env.SERVER_REFRESH_TOKEN_SECRET || 'abacate';

export const config = {
    DATABASE_URL: `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@node-js.khm1gei.mongodb.net/?retryWrites=true&w=majority`,
    PORT: process.env.SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET,
        refresh_secret: SERVER_REFRESH_TOKEN_SECRET
    }
}