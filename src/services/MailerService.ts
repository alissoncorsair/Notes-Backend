import nodemailer from 'nodemailer';
import { config } from '../config/config';

class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.user,
                pass: config.mail.pass,
            },
        });
    }

    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: config.mail.user,
            to: to,
            subject: subject,
            html: text
        };
        try {
            const mail = await this.transporter.sendMail(mailOptions);
            console.log(mail);
        } catch (e) {
            console.log(e);
        }
        
    }
}

export default new MailerService();