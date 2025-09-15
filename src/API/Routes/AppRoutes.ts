import { DITypes } from "#Globals/DI/DITypes.js";
import { Router } from "express";
import { inject, injectable } from "inversify";
import { FooRoutes } from "./FooRoutes.js";

@injectable()
export class AppRoutes {
  private readonly path = "/api";
  private readonly router: Router;

  constructor(@inject(DITypes.FooRoutes) private readonly fooRoutes: FooRoutes) {
    this.router = Router();

    this.initializeRoutes();
    this.router.use(this.path, this.router);
  }

  private initializeRoutes(): void {
    this.router.use(this.fooRoutes.routes());
  }

  public routes(): Router {
    return this.router;
  }
}
