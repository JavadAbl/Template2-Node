import { UserController } from "#API/Controllers/UserController.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UserRoutes {
  private readonly path = "/User";
  private router: Router;

  constructor(@inject(DITypes.UserController) private readonly userController: UserController) {
    this.router = Router();
    this.initializeRoutes();
    this.router.use(this.path, this.router);
  }
  public routes(): Router {
    return this.router;
  }

  private initializeRoutes(): void {
    this.router.post("/register", (req, res) => this.userController.register(req, res));
  }
}
