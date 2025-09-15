import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IFooService } from "#Application/Interfaces/IFooService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IFooDto } from "#Domain/Dto/IFooDto.js";
import { zodValidation } from "#API/Decorators/ZodValidation.js";

@injectable()
export class FooController {
  constructor(@inject(DITypes.FooController) private readonly fooService: IFooService) {}

  @zodValidation(RegisterScheme)
  public async get(req: Request<unknown, unknown, IFooDto>, res: Response) {
    const foo = await this.fooService.getFoo();
    res.json(foo);
  }
}
