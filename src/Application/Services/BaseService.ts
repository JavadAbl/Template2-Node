import { IBaseService } from "#Application/Interfaces/IBaseService.js";
import { IBaseRepository } from "#Infrastrucure/Database/Interfaces/IBaseRepository.js";

export class BaseService<TModel, TFindManyArgs, TFindUniqueArgs, TCreateArgs, TUpdateArgs, TDeleteArgs>
  implements IBaseService<TModel, TFindManyArgs, TFindUniqueArgs, TCreateArgs, TUpdateArgs, TDeleteArgs>
{
  constructor(private readonly repository: IBaseRepository<TModel, TFindManyArgs, TFindUniqueArgs, TCreateArgs, TUpdateArgs, TDeleteArgs>) {}

  findMany(criteria?: TFindManyArgs): Promise<TModel[]> {
    return this.repository.findMany(criteria);
  }

  findUnique(criteria: TFindUniqueArgs): Promise<TModel | null> {
    return this.repository.findUnique(criteria);
  }

  create(data: TCreateArgs): Promise<TModel> {
    return this.repository.create(data);
  }

  update(data: TUpdateArgs): Promise<TModel> {
    return this.repository.update(data);
  }

  delete(criteria: TDeleteArgs): Promise<TModel> {
    return this.repository.delete(criteria);
  }
}
