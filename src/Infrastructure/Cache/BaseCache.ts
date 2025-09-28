import { config } from "#Globals/Configs/AppConfig.js";
import { AppLogger } from "#Globals/Utils/Logger.js";
import { createClient } from "redis";

export class BaseCache {
  client: ReturnType<typeof createClient>;
  logger;

  constructor(cacheName: string) {
    this.logger = AppLogger.createLogger(cacheName);

    this.client = createClient({
      url: config.REDIS_ADDRESS || "redis://localhost:6379",
      commandOptions: { abortSignal: new AbortController().signal },
    });

    this.client.on("error", (err) => {
      this.logger.error("Redis Client Error", err);
    });
  }
}
