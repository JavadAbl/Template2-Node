import { IFindUniqueDto } from "#API/Interfaces/Dto/IFindUniqueDto.js";
import { IQueryDto } from "#API/Interfaces/Dto/IQueryDto.js";
import { IUserDto } from "#Domain/Dto/User/IUserDto.js";
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";

export interface IUserService {
  create(criteria: Prisma.UserCreateArgs): Promise<IUserDto>;

  findOne(criteria: Prisma.UserFindFirstArgs): Promise<IUserDto | null>;

  findUnique(criteria: IFindUniqueDto): Promise<IUserDto | null>;

  findMany(criteria: IQueryDto): Promise<IUserDto[]>;
}
