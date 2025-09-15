import { app } from "#app.js";
import { logger } from "#utils/log/logger.js";
import { createServer } from "http";
import mongoose from "mongoose";
import config from "#utils/config/config.js";

// console.log(encodeURIComponent(config.DB_CONNECTION));

mongoose
  .connect(encodeURI("mongodb+srv://admin:123456@cluster0.qto0oqu.mongodb.net"))
  .then(() => {
    logger.info("connected to mongodb");
  })
  .catch((err: unknown) => {
    console.log(12321321);

    logger.error(err.message, err);
  });

const httpServer = createServer(app);
const server = httpServer.listen(config.SERVER_PORT, () => {
  logger.info(`server listening on port ${config.SERVER_PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unExpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unExpectedErrorHandler);
process.on("SIGTERM", () => {
  logger.info("SIGTERM recieved");
  if (server) {
    server.close();
  }
});
