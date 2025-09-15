import { FooController } from "#API/Controllers/FooController.js";
import { Container } from "inversify";
import { DITypes } from "./DITypes.js";
import { IFooService } from "#Application/Interfaces/IFooService.js";
import { FooService } from "#Application/Services/FooService.js";
import { AppRoutes } from "#API/Routes/AppRoutes.js";
import { FooRoutes } from "#API/Routes/FooRoutes.js";

const container = new Container();

// Bind controllers
container.bind<FooController>(DITypes.FooController).to(FooController).inSingletonScope();

// Bind interface to implementation
container.bind<IFooService>(DITypes.FooService).to(FooService).inSingletonScope();

// Bind Routes
container.bind<AppRoutes>(DITypes.AppRoutes).to(AppRoutes).inSingletonScope();
container.bind<FooRoutes>(DITypes.FooRoutes).to(FooRoutes).inSingletonScope();

export { container };
