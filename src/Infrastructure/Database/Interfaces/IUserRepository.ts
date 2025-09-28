// IUserRepository.ts

import { User, Prisma } from "../Prisma/index.js";

export interface IUserRepository {
  findOne(criteria?: Prisma.UserFindFirstArgs): Promise<User | undefined>;

  findMany(criteria?: Prisma.UserFindManyArgs): Promise<User[]>;

  findUnique(criteria: Prisma.UserFindUniqueArgs): Promise<User | undefined>;

  create(data: Prisma.UserCreateArgs): Promise<User>;

  update(data: Prisma.UserUpdateArgs): Promise<User>;

  delete(criteria: Prisma.UserDeleteArgs): Promise<User>;
}
