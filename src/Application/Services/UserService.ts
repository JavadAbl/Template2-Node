// UserService.ts

import { IUserService } from "#Application/Interfaces/IUserService.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IUserRepository } from "#Infrastrucure/Database/Interfaces/IUserRepository.js";
import { Prisma, User } from "#Infrastrucure/Database/Prisma/index.js";
import { inject, injectable } from "inversify";
import { BaseService } from "./BaseService.js";

@injectable()
export class UserService
  extends BaseService<
    User,
    Prisma.UserFindManyArgs,
    Prisma.UserFindUniqueArgs,
    Prisma.UserCreateArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserDeleteArgs
  >
  implements IUserService
{
  constructor(@inject(DITypes.UserRepository) repository: IUserRepository) {
    super(repository);
  }

  // Example of business logic beyond plain CRUD
  async findByUsername(username: string): Promise<User | null> {
    return this.findUnique({ where: { username } });
  }
}
