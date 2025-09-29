import { inject, injectable } from "inversify";
import { BaseWorker, HandlerMap } from "./BaseWorker.js";
import { UserJobs } from "../Jobs/UserJobs.js";
import { DITypes } from "#Globals/DI/DITypes.js";
import { UserService } from "#Application/Services/UserService.js";
import { UserQueue } from "../Queues/UserQueue.js";

@injectable()
export class UserWorker extends BaseWorker {
  constructor(@inject(DITypes.UserService) authService: UserService) {
    const handlers: HandlerMap<UserJobs> = { CreateUser: authService.create.bind(authService) };

    super(UserQueue.name, handlers);
  }
}
