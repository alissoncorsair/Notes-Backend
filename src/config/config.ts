import dotenv from 'dotenv';

dotenv.config();

const DATABASE_USERNAME = process.env.MONGO_USERNAME;

const DATABASE_PASSWORD = process.env.MONGO_PASSWORD;
export const config = {
    DATABASE_URL: `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@node-js.khm1gei.mongodb.net/?retryWrites=true&w=majority`,
    PORT: process.env.SERVER_PORT,
}