import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { zodValidation } from "#API/Decorators/ZodValidation.js";
import { IRegisterUser } from "#Domain/Dto/User/IRegisterUser.js";
import { registerUserSchema } from "#API/Validators/User/RegisterUserSchema.js";

@injectable()
export class UserController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  @zodValidation(registerUserSchema)
  public async register(req: Request<unknown, unknown, IRegisterUser>, res: Response) {
    const userDto = await this.userService.create({ data: req.body });
    res.status(201).send(userDto);
  }

  public async get(req: Request<unknown, unknown, unknown, IRegisterUser>, res: Response) {
    const userDto = await this.userService.create({ data: req.body });
    res.status(201).send(userDto);
  }
}
