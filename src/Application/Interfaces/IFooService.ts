import { Prisma, Foo } from "#Infrastrucure/Database/Prisma/index.js";
import { IBaseService } from "./IBaseService.js";

export type IFooService = IBaseService<
  Foo,
  Prisma.FooFindManyArgs,
  Prisma.FooFindUniqueArgs,
  Prisma.FooCreateArgs,
  Prisma.FooUpdateArgs,
  Prisma.FooDeleteArgs
>;
