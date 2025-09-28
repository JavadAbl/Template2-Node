import { AppError } from "#Globals/Utils/AppError.js";
import dotenv from "dotenv";
import status from "http-status";

class AppConfig {
  NODE_ENV?: string;
  DATABASE_URL?: string;
  HTTP_PORT?: string;
  HTTP_ADDRESS?: string;
  REDIS_ADDRESS?: string;
  REDIS_PORT?: string;

  constructor() {
    dotenv.config();
    this.NODE_ENV = process.env.NODE_ENV;
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.HTTP_PORT = process.env.HTTP_PORT;
    this.HTTP_ADDRESS = process.env.HTTP_ADDRESS;
    this.REDIS_ADDRESS = process.env.REDIS_ADDRESS;
    this.REDIS_PORT = process.env.REDIS_PORT;

    this.validateConfig();
  }

  validateConfig() {
    for (const [key, value] of Object.entries(this)) {
      if (!value) {
        throw new AppError(`Missing environment variable: ${key}`, status.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

export const config = new AppConfig();
