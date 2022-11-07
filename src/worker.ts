import { Worker } from 'bullmq';
import { config } from './config/config';
import MailerService from './services/MailerService';

const worker = new Worker("emailQueue", async job => {

  await MailerService.sendMail(job.data.to, job.data.subject, job.data.text);
}, {
    connection: {
        host: config.redis.host,
        port: Number(config.redis.port),
        username: config.redis.username,
        password: config.redis.password
    }
});

console.log("Worker started! asap ☺");
