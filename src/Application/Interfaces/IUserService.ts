import { IUserDto } from "#Domain/Dto/User/IUserDto.js";
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";

export interface IUserService {
  create(criteria: Prisma.UserCreateArgs): Promise<IUserDto>;

  findOne(criteria: Prisma.UserFindFirstArgs): Promise<IUserDto | null>;
}
