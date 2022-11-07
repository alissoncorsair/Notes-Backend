import { Request, Response } from "express";
import Mailer from "../services/MailerService";

class MailerController {

    async sendEmail(req: Request, res: Response) {
        const { to, subject, text } = req.body;
        Mailer.sendMail(to, subject, text);
        return res.json({ message: "Email sent!" });
    }

}

export default new MailerController();