import { Prisma } from "#Infrastructure/Database/Prisma/index.js";
import { IQueryDto } from "./IQueryDto.js";

export interface IUserListQueryDto extends IQueryDto {
  /** Restrict sortBy to fields that actually exist on the User model */
  sortBy?: keyof Prisma.UserOrderByWithRelationInput;
}
