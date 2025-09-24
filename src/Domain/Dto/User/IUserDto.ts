import { User } from "#Domain/Entity/User.js";

export type IUserDto = Omit<User, "password">;
