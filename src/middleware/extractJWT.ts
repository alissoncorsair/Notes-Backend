import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../config/config";

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.token.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            res.locals.jwt = decoded;
            next();
        }
    )} else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};