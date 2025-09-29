import { AppLogger } from "#Globals/Utils/Logger.js";
import { Worker, Job } from "bullmq";

export type HandlerMap<JobName extends string> = Record<JobName, (data: any) => Promise<any>>;

export class BaseWorker<JobName extends string> {
  private worker: Worker;
  private logger = AppLogger.createLogger(BaseWorker.name);

  constructor(queueName: string, handlers: HandlerMap<JobName>) {
    this.logger.info(`Starting worker for queue: ${queueName}`);

    this.worker = new Worker(queueName, async (job: Job) => {
      const handler = handlers[job.name as JobName];

      if (!handler) {
        this.logger.warn(`No handler found for job: ${job.name}`);
        return;
      }

      try {
        this.logger.info(`Processing job: ${job.name}`);
        return await handler(job.data);
      } catch (err) {
        this.logger.error(`Error processing job: ${job.name}`, err);
        throw err;
      }
    });
  }
}
