import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../schemas/User';

/**
 @TODO
 */
const signJWT = (user: IUser, cb: (err: Error | null, token: string | null) => void) => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    const token = jwt.sign(
        {
            username: user.username,
            password: user.password
        },
        config.token.secret,
        {
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds,
        }
    );



}