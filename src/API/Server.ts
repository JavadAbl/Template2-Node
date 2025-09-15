import { Application } from "express";
import * as http from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import express from "express";
import { container } from "#Globals/DI/DICore.js";
import { AppRoutes } from "./Routes/AppRoutes.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import status from "http-status";
import { errorHandlerMiddleware } from "./Middlewars/ErrorHandlerMiddleware.js";
import { config } from "#Globals/Configs/AppConfig.js";
import { AppLogger } from "#Globals/Utils/Logger.js";

const logger = AppLogger.createLogger("Server");

export class AppServer {
  constructor(private readonly app: Application) {}

  public start(): void {
    try {
      this.setupSecurityMiddlewares(this.app);
      this.setupStandardMiddlewares(this.app);
      this.setupRoutesMiddlewares(this.app);
      this.setupErrorHandler(this.app);
      this.setupHttpServer(this.app);
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  }

  //--------------------------------------------------------------------------------
  private setupSecurityMiddlewares(app: Application): void {
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      }),
    );

    app.use(helmet());
    app.use(hpp());
  }

  //--------------------------------------------------------------------------------
  private setupStandardMiddlewares(app: Application): void {
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
  }

  //--------------------------------------------------------------------------------
  private setupRoutesMiddlewares(app: Application): void {
    const appRoutes = container.get<AppRoutes>(DITypes.AppRoutes);
    app.use(appRoutes.routes());
  }

  //--------------------------------------------------------------------------------
  private setupErrorHandler(app: Application): void {
    app.all("/{*any}", (req, res) => {
      res.status(status.NOT_FOUND).json({ message: "Not found" });
    });

    app.use(errorHandlerMiddleware);
  }

  //--------------------------------------------------------------------------------
  private setupHttpServer(app: Application): http.Server {
    const httpServer = http.createServer(app);

    httpServer.listen(config.HTTP_PORT, () => {
      logger.info(`Server started on process ${process.pid}`);
      logger.info("Server running on port " + config.HTTP_PORT);
    });

    return httpServer;
  }
}
