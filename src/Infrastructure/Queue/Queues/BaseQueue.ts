import bullmq, { JobsOptions } from "bullmq";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { AppLogger } from "#Globals/Utils/Logger.js";
import { config } from "#Globals/Configs/AppConfig.js";

const bullMQAdapters: BullMQAdapter[] = [];

export const expressAdapter = new ExpressAdapter();
expressAdapter.setBasePath("/queues");

export class BaseQueue {
  queue: bullmq.Queue;
  logger;

  constructor(queueName: string) {
    this.queue = new bullmq.Queue(queueName, {
      connection: {
        url: config.REDIS_ADDRESS,
        username: config.REDIS_USERNAME,
        password: config.REDIS_PASSWORD,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
      },
    });

    bullMQAdapters.push(new BullMQAdapter(this.queue));

    createBullBoard({ queues: bullMQAdapters, serverAdapter: expressAdapter });

    this.logger = AppLogger.createLogger(queueName);
  }

  protected addJob<T = any>(name: string, data: T, options?: JobsOptions) {
    return this.queue.add(name, data, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      ...options,
    });
  }

  protected processJob<T = any>(name: string, concurrency: number, callback: bullmq.Processor<T>) {
    const worker = new bullmq.Worker(this.queue.name, (job) => callback(job), {
      concurrency,
      connection: this.queue.opts.connection ?? {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });

    worker.on("failed", (job, err) => {
      this.logger?.error?.(`Job ${job?.name} failed: ${err.message}`);
    });

    worker.on("completed", (job) => {
      this.logger?.info?.(`Job ${job?.name} completed successfully.`);
    });

    return worker;
  }
}
