import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config';

class App {
    public express: Application;

    constructor() {
        this.express = express();
    }

    public async init() {
        this.middlewares();
        await this.database();
        this.routes();
        this.express.listen(config.PORT || 3000, () => {
            console.log(`Server running on port ${config.PORT || 3000}`);
        });
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(urlencoded({ extended: true }));
        this.express.use(cors());
    }

    private async database() {
        try {
            await mongoose.connect(config.DATABASE_URL);
            console.log('Database connected');
        } catch (error) {
            console.log('Database connection failed');
        }

    }

    private routes() {
        this.express.get('/', (req, res) => {
            res.json({ message: 'Hello World' });
        });
    }

}

export default new App();
