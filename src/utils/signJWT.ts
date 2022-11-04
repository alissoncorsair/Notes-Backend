import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../schemas/User';

export interface IUserDTO {
    username: string;
    email?: string;
    password?: string;
}

export const generateAccessToken = ({ username, password, email }: IUserDTO) => {
    return jwt.sign({ username: username, password: password, email: email }, config.token.secret, { expiresIn: '10m' });
}

export const generateRefreshToken = async (user: IUser) => {
    const token = jwt.sign({ username: user.username, password: user.password, email: user.email }, config.token.refresh_secret);
    user.refreshToken = token;
    await user.save();
    return token;
}