import { Request, Response } from "express";
import UserModel, { IUser } from "../schemas/UserModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, IUserDTO } from "../utils/signJWT";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import emailQueue from "../queues/emailQueue";
import UploadImageService from "../services/UploadImageService";
import { S3Storage } from "../utils/S3Storage";
import DeleteImageService from "../services/DeleteImageService";

class UserController {

    public async index(req: Request, res: Response) {

        const users = await UserModel.find().select('-password').select('-refreshToken');

        return res.json({ users });
    }

    public async register(req: Request, res: Response) {

        const { username, password, email }: IUser = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        try {
            const emailInUse = await UserModel.findOne({ email }) ? true : false;
            const usernameInUse = await UserModel.findOne({ username }) ? true : false;
            if (emailInUse || usernameInUse) {
                return res.status(400).json({ inUse: { email: emailInUse, username: usernameInUse } });
            }
            const user = await UserModel.create({ username, password: hashedPass, email });

            await emailQueue.add('SendEmail', {
                to: email, subject: `Bem vindo, ${username}!`, text: `<h2>Olá ${username}, obrigado por se registrar em nosso site! 😄 
            Sua conta já está liberada para acesso.</h2>` });

            return res.json({ message: "User created!", user });
        } catch (error) {
            return res.status(400).json({ message: "Something went wrong!", error });
        }

    }

    public async update(req: Request, res: Response) {
        const { username } = res.locals.jwt;

        try {
            const user = await UserModel.findOne({ username });

            if (user) {
                if (req.file) {
                    await UploadImageService.execute(req.file);
                    const s3 = new S3Storage();
                    const uploadUrl = s3.getFile(req.file.filename);
                    user.photo_url = user.photo_url ? await DeleteImageService.execute(user.photo_url.split('.com/')[1]).then(() => uploadUrl) : uploadUrl;
                }
                await user.save();
                return res.json({ message: "User updated!", user: {...user.toObject(), password: undefined} });
            }
            return res.status(400).json({ message: "User not found!" });
        } catch (error) {
            return res.status(400).json({ message: "Something went wrong!", error });
        }

    }

    public async login(req: Request, res: Response) {

        const { username, password } = req.body;

        if (!(username && password)) { 
            return res.status(400).json({ message: "Username and password required!" });
        }
        try {
            const user = await UserModel.findOne({ username });
            if (user) {
                const isValid = await bcrypt.compare(password, user.password);
                if (isValid) {
                    const userWithoutPass = { id: user.id, username: user.username, email: user.email, photo_url: user.photo_url };
                    return res.json({ user: userWithoutPass, token: generateAccessToken(user), refreshToken: await generateRefreshToken(user) });
                }
                return res.status(400).json({ error: "Invalid password!" });
            } else {
                return res.status(400).json({ message: "User not found!" });
            }
        } catch (error) {
            return res.status(400).json({ message: "Something went wrong!" });
        }
    }

    public async token(req: Request, res: Response) {

        const { refreshToken } = req.body;
        if (refreshToken) {
            const user = await UserModel.findOne({ refreshToken });
            if (user) {
                const decoded = jwt.verify(refreshToken, config.token.refresh_secret);
                if (decoded) {
                    return res.json({
                        token: generateAccessToken({
                            id: (decoded as IUserDTO).id,
                            username: (decoded as IUserDTO).username,
                            password: (decoded as IUserDTO).password,
                            email: (decoded as IUserDTO).email
                        })
                    });
                }
            }
            return res.json({ message: "Invalid token!" });
        } else {
            return res.json({ message: "Token not provided!" });
        }
    }

}

export default new UserController();