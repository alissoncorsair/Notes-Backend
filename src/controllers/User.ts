import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";
import bcrypt from "bcrypt";

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
                    return res.json({message: "Logged in!"});
                }
                return res.json({message: "Invalid password!"});
            } else {
                return res.status(400).json({message: "User not found!"});
            }
        } catch (error) {
            return res.status(400).json({message: "Something went wrong!"});
        }
    }
}

export default new UserController();