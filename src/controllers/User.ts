import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../schemas/User";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/signJWT";
import { extractJWT } from "../middleware/extractJWT";

class UserController {
    public async index(req: Request, res: Response) {
        const users = await User.find();
    
        return res.json({users});
    }

    public async register(req: Request, res: Response) {
        const { username, password, email }: IUser = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({ username, password: hashedPass, email });
            return res.json({message: "User created!", user});
        } catch (error) {
            return res.status(400).json({message: "Something went wrong!", error});
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
                    return res.json({user: userWithoutPass, token: signJWT(user)});
                }
                return res.json({message: "Invalid password!"});
            } else {
                return res.status(400).json({message: "User not found!"});
            }
        } catch (error) {
            return res.status(400).json({message: "Something went wrong!"});
        }
    }

    public async generate(req: Request, res: Response) {
        return res.json({token: signJWT(req.body)});
    }
}

export default new UserController();