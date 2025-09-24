// IUserRepository.ts

import { User, Prisma } from "../Prisma/index.js";
import { IBaseRepository } from "./IBaseRepository.js";

export type IUserRepository = IBaseRepository<
  User,
  Prisma.UserFindManyArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserCreateArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserDeleteArgs
>;
