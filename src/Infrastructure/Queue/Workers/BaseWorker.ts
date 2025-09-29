import { config } from "#Globals/Configs/AppConfig.js";
import { AppLogger } from "#Globals/Utils/Logger.js";
import { Worker } from "bullmq";

export type HandlerMap<JobName extends string> = Record<JobName, (data: any) => Promise<any>>;

export class BaseWorker {
  private worker!: Worker;
  private logger = AppLogger.createLogger(BaseWorker.name);
  queueName: string;

  constructor(queueName: string) {
    this.logger.info(`Starting worker for queue: ${queueName}`);
    this.queueName = queueName;
    this.setupWorker();
  }

  private setupWorker() {
    this.worker = new Worker(
      this.queueName,
      async (job) => {
        switch (job.name) {
          case "send-email":
            return await sendEmail(job.data);
          case "process-image":
            return await processImage(job.data);
          default:
            throw new Error(`Unknown job type: ${job.name}`);
        }
      },
      {
        connection: {
          url: config.REDIS_ADDRESS,
          username: config.REDIS_USERNAME,
          password: config.REDIS_PASSWORD,
        },
      },
    );
  }

  protected startWorker() {
    this.worker.run();
  }
}
