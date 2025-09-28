import { IUserService } from "#Application/Interfaces/IUserService.js";
import { IUserDto, toUserDto } from "#Domain/Dto/User/IUserDto.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { IUserRepository } from "#Infrastructure/Database/Interfaces/IUserRepository.js";
import { inject, injectable } from "inversify";
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";
import { AppError } from "#Globals/Utils/AppError.js";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(DITypes.UserRepository) private readonly rep: IUserRepository) {}

  async create(criteria: Prisma.UserCreateArgs): Promise<IUserDto> {
    const existingUser = await this.findOne({ where: { username: criteria.data.username } });

    if (existingUser) throw new AppError("This user is already exists");

    const user = await this.rep.create(criteria);

    return user;
  }

  async findOne(criteria: Prisma.UserFindFirstArgs): Promise<IUserDto | null> {
    const user = await this.rep.findOne(criteria);
    return toUserDto(user);
  }
}
