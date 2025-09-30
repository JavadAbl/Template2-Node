import { Prisma } from "#Infrastructure/Database/Prisma/index.js";
import { QueryDto } from "./QueryDto.js";

export interface UserListQueryDto extends QueryDto {
  /** Restrict sortBy to fields that actually exist on the User model */
  sortBy?: keyof Prisma.UserOrderByWithRelationInput;
}
