import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository.js";
import { Foo, Prisma, PrismaClient } from "../Prisma/index.js";
import { IFooRepository } from "../Interfaces/IFooRepository.js";
import { DITypes } from "#Globals/DI/DITypes.js";

@injectable()
export class FooRepository
  extends BaseRepository<Foo, Prisma.FooFindManyArgs, Prisma.FooFindUniqueArgs, Prisma.FooCreateArgs, Prisma.FooUpdateArgs, Prisma.FooDeleteArgs>
  implements IFooRepository
{
  constructor(@inject(DITypes.PrismaClient) prisma: PrismaClient) {
    super(prisma.foo);
  }
}
