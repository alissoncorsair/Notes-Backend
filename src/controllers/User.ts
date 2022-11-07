import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, IUserDTO } from "../utils/signJWT";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import emailQueue from "../queues/emailQueue";

class UserController {

    public async index(req: Request, res: Response) {

        const users = await User.find().select('-password').select('-refreshToken');

        return res.json({ users });
    }

    public async register(req: Request, res: Response) {

        const { username, password, email }: IUser = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({ username, password: hashedPass, email });
            await emailQueue.add('SendEmail', {
                to: email, subject: `Bem vindo, ${username}!`, text: `<h2>Olá ${username}, obrigado por se registrar em nosso site! 😄 
            Sua conta já está liberada para acesso.</h2>` });

            return res.json({ message: "User created!", user });
        } catch (error) {
            return res.status(400).json({ message: "Something went wrong!", error });
        }

    }

    public async login(req: Request, res: Response) {

        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (user) {
                const isValid = await bcrypt.compare(password, user.password);
                if (isValid) {
                    const userWithoutPass = { username: user.username, email: user.email };
                    return res.json({ user: userWithoutPass, token: generateAccessToken(user), refreshToken: await generateRefreshToken(user) });
                }
                return res.json({ message: "Invalid password!" });
            } else {
                return res.status(400).json({ message: "User not found!" });
            }
        } catch (error) {
            return res.status(400).json({ message: "Something went wrong!" });
        }
    }

    public async validate(req: Request, res: Response) {
        return res.json({ token: generateAccessToken(req.body) });
    }

    public async token(req: Request, res: Response) {

        const { refreshToken } = req.body;
        if (refreshToken) {
            const user = await User.findOne({ refreshToken });
            if (user) {
                const decoded = jwt.verify(refreshToken, config.token.refresh_secret);
                if (decoded) {
                    return res.json({ token: generateAccessToken({ username: (decoded as IUserDTO).username, password: (decoded as IUserDTO).password, email: (decoded as IUserDTO).email }) });
                }
            }
            return res.json({ message: "Invalid token!" });
        }
    }
}

export default new UserController();