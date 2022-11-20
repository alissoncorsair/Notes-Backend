import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../schemas/UserModel';
import { Types } from 'mongoose';

export interface IUserDTO {
    id?: Types.ObjectId;
    username: string;
    email?: string;
    password?: string;
}

export const generateAccessToken = ({ id, username, password, email }: IUserDTO) => {
    return jwt.sign({ id, username, password, email }, config.token.secret, { expiresIn: '10m' });
}

export const generateRefreshToken = async (user: IUser) => {
    const token = jwt.sign({ id: user._id, username: user.username, password: user.password, email: user.email }, config.token.refresh_secret);
    user.refreshToken = token;
    await user.save();
    return token;
}