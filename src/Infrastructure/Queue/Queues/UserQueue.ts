import { injectable } from "inversify";
import { BaseQueue } from "./BaseQueue.js";
import { UserContract, UserJobs } from "../Jobs/UserJobsContract.js";
import { IRegisterUser } from "#Domain/Dto/User/IRegisterUser.js";

@injectable()
export class UserQueue extends BaseQueue<UserContract> {
  constructor() {
    super(UserQueue.name);
  }

  createUserJob(payload: IRegisterUser) {
    this.addJob(UserJobs.CreateUser, payload);
    this.logger.info(`Job added: ${UserJobs.CreateUser}`, payload);
  }
}
