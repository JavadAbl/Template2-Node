import { injectable } from "inversify";
import { BaseQueue } from "./BaseQueue.js";
import { IRegisterUser } from "#Domain/Dto/User/IRegisterUser.js";
import { UserJobs } from "../Jobs/UserJobs.js";

@injectable()
export class UserQueue extends BaseQueue {
  constructor() {
    super(UserQueue.name);
  }

  createUserJob(payload: IRegisterUser): void {
    this.addJob<CreateUserJob>(UserJobs.CreateUser, payload);
    // this.logger.info(`Job added: ${UserQueue.CreateUser}`, payload);
  }
}
