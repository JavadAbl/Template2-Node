import { FooController } from "#API/Controllers/FooController.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class FooRoutes {
  private readonly path = "/Foo";
  private router: Router;

  constructor(@inject(DITypes.FooController) private readonly fooController: FooController) {
    this.router = Router();
    this.initializeRoutes();
    this.router.use(this.path, this.router);
  }
  public routes(): Router {
    return this.router;
  }

  private initializeRoutes(): void {
    this.router.get("/register", (req, res) => this.fooController.get(req, res));
  }
}
