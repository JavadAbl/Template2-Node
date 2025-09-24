// FooService.ts

import { IFooService } from "#Application/Interfaces/IFooService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IFooRepository } from "#Infrastrucure/Database/Interfaces/IFooRepository.js";
import { Prisma, Foo } from "#Infrastrucure/Database/Prisma/index.js";
import { inject, injectable } from "inversify";
import { BaseService } from "./BaseService.js";

@injectable()
export class FooService
  extends BaseService<
    Foo,
    Prisma.FooFindManyArgs,
    Prisma.FooFindUniqueArgs,
    Prisma.FooCreateArgs,
    Prisma.FooUpdateArgs,
    Prisma.FooDeleteArgs
  >
  implements IFooService
{
  constructor(@inject(DITypes.FooRepository) repository: IFooRepository) {
    super(repository);
  }
}
