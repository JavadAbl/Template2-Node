import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository.js";
import { User, Prisma, PrismaClient } from "../Prisma/index.js";
import { IUserRepository } from "../Interfaces/IUserRepository.js";
import { DITypes } from "#Globals/DI/DITypes.js";

@injectable()
export class UserRepository
  extends BaseRepository<
    User,
    Prisma.UserFindManyArgs,
    Prisma.UserFindUniqueArgs,
    Prisma.UserCreateArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserDeleteArgs
  >
  implements IUserRepository
{
  constructor(@inject(DITypes.PrismaClient) prisma: PrismaClient) {
    super(prisma.user);
  }
}
