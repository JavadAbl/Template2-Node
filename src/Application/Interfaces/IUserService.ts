import { Prisma, User } from "#Infrastrucure/Database/Prisma/index.js";
import { IBaseService } from "./IBaseService.js";

export interface IUserService
  extends IBaseService<
    User,
    Prisma.UserFindManyArgs,
    Prisma.UserFindUniqueArgs,
    Prisma.UserCreateArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserDeleteArgs
  > {
  // you can add User-specific service methods here
  findByUsername(username: string): Promise<User | null>;
}
