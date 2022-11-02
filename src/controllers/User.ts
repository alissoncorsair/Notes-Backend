import { Request, Response } from "express";
import User, { IUser } from "../schemas/User";

class UserController {
    public async index(req: Request, res: Response) {
        const users = await User.find();
    
        return res.json({users});
    }

    public async create(req: Request, res: Response) {
        const { username, password, email }: IUser = req.body;
        try {
            const user = await User.create({ username, password, email });
            return res.json({message: "User created!", user});
        } catch (error) {
            return res.status(400).json({message: "Something went wrong!"});
        }
        
    }

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username, password });
            if (user) {
                return res.json({message: "Logged in!"});
            } else {
                return res.status(400).json({message: "User not found!"});
            }
        } catch (error) {
            return res.status(400).json({message: "Something went wrong!"});
        }
    }
}

export default new UserController();