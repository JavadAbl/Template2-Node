import { IUserService } from "#Application/Interfaces/IUserService.js";
import { IUserDto, toUserDto } from "#Domain/Dto/User/IUserDto.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IUserRepository } from "#Infrastructure/Database/Interfaces/IUserRepository.js";
import { inject, injectable } from "inversify";
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";
import { AppError } from "#Globals/Utils/AppError.js";
import { UserCache } from "#Infrastructure/Cache/UserCache.js";
import { IQueryDto } from "#API/Interfaces/Dto/IQueryDto.js";
import { buildFindManyArgs } from "#Globals/Utils/PrismaUtils.js";
import { IFindUniqueDto } from "#API/Interfaces/Dto/IFindUniqueDto.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(DITypes.UserRepository) private readonly rep: IUserRepository,
    @inject(DITypes.UserCache) private readonly userCache: UserCache,
  ) {}
  findUnique(criteria: IFindUniqueDto): Promise<IUserDto | null> {
    return this.rep.findUnique({ where: { [criteria.field]: criteria.value } });
  }

  async findMany(criteria: IQueryDto): Promise<IUserDto[]> {
    const args = buildFindManyArgs<"User">(criteria, {
      searchableFields: ["username"],
    });

    return this.rep.findMany(args).then((users) => users.map(toUserDto));
  }

  async create(criteria: Prisma.UserCreateArgs): Promise<IUserDto> {
    const existingUser = await this.findOne({ where: { username: criteria.data.username } });

    if (existingUser) throw new AppError("This user is already exists");

    const user = await this.rep.create(criteria);

    const userDto = toUserDto(user);
    await this.userCache.set(String(user.id), userDto, 3600);

    return userDto;
  }

  async findOne(criteria: Prisma.UserFindFirstArgs): Promise<IUserDto | null> {
    const user = await this.rep.findOne(criteria);
    return user ? toUserDto(user) : null;
  }
}
