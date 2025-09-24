import { Foo, Prisma } from "../Prisma/index.js";
import { IBaseRepository } from "./IBaseRepository.js";

export type IFooRepository = IBaseRepository<
  Foo,
  Prisma.FooFindManyArgs,
  Prisma.FooFindUniqueArgs,
  Prisma.FooCreateArgs,
  Prisma.FooUpdateArgs,
  Prisma.FooDeleteArgs
>;
