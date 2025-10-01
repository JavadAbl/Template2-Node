import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "#Application/Interfaces/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { zodValidation } from "#API/Decorators/ZodValidation.js";
import { IRegisterUser } from "#Domain/Dto/User/IRegisterUser.js";
import { registerUserSchema } from "#API/Validators/User/RegisterUserSchema.js";
import { IQueryDto } from "#API/Interfaces/Dto/IQueryDto.js";

@injectable()
export class UserController {
  constructor(@inject(DITypes.UserService) private readonly userService: IUserService) {}

  @zodValidation(registerUserSchema)
  public async register(req: Request<unknown, unknown, IRegisterUser, unknown>, res: Response) {
    const userDto = await this.userService.create({ data: req.body });
    return res.status(201).json(userDto);
  }

  public async get(req: Request<unknown, unknown, unknown, IQueryDto>, res: Response) {
    const users = await this.userService.findMany(req.query);
    return res.json(users);
  }

  public async getById(req: Request<{ id: string }, unknown, unknown, unknown>, res: Response) {
    const criteria = { field: "id", value: req.params.id };
    const users = await this.userService.findUnique(criteria);
    return res.json(users);
  }
}
