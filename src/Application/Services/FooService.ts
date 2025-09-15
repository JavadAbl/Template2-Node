import { IFooService } from "#Application/Interfaces/IFooService.js";
import { IFooDto } from "#Domain/Dto/IFooDto.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { inject, injectable } from "inversify";

@injectable()
export class FooService implements IFooService {
  constructor(@inject(DITypes.PrismaClient) private readonly prisma: PrismaClient) {}

  public async getFoo(): Promise<IFooDto | null> {
    return { name: "Foo" };
  }
}
