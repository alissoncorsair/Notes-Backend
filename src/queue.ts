import mailQueue from "./lib/Queue";
import SendEmail from "./jobs/SendEmail";
import { Job } from "bull";

mailQueue.process(async (job: Job) => {
    // SendEmail.handle(job.data);
    console.log(job.data);
    console.log("oi");
});