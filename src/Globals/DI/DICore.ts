import { Container } from "inversify";
import { DITypes } from "./DITypes.js";
import { AppRoutes } from "#API/Routes/AppRoutes.js";
import { IUserService } from "#Application/Interfaces/IUserService.js";
import { UserService } from "#Application/Services/UserService.js";
import { UserRepository } from "#Infrastructure/Database/Repository/UserRepository.js";
import { IUserRepository } from "#Infrastructure/Database/Interfaces/IUserRepository.js";
import { UserController } from "#API/Controllers/UserController.js";
import { UserRoutes } from "#API/Routes/UserRoutes.js";
import { PrismaClient } from "#Infrastructure/Database/Prisma/index.js";

const container = new Container();

// Bind controllers
container.bind<UserController>(DITypes.UserController).to(UserController).inSingletonScope();

// Bind Services
container.bind<IUserService>(DITypes.UserService).to(UserService).inSingletonScope();

// Bind Routes
container.bind<AppRoutes>(DITypes.AppRoutes).to(AppRoutes).inSingletonScope();
container.bind<UserRoutes>(DITypes.UserRoutes).to(UserRoutes).inSingletonScope();

// Bind Repositories
container.bind<PrismaClient>(DITypes.PrismaClient).toConstantValue(new PrismaClient());
container.bind<IUserRepository>(DITypes.UserRepository).to(UserRepository).inSingletonScope();

export { container };
