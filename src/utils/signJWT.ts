import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../schemas/User';

/**
 @TODO
 */
export const signJWT = ({ username, password }: IUser) => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    const token = jwt.sign(
        {
            username,
            password
        },
        config.token.secret,
        {
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds,
        }
    );

    return token;



}