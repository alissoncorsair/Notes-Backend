import { Queue } from "bullmq";
import { config } from "../config/config";

const emailQueue = new Queue("emailQueue", {
    connection: { host: config.redis.host, port: Number(config.redis.port), username: config.redis.username, password: config.redis.password }
});

export default emailQueue;