export interface IBaseService<TModel, TFindManyArgs, TFindUniqueArgs, TCreateArgs, TUpdateArgs, TDeleteArgs> {
  findMany(criteria?: TFindManyArgs): Promise<TModel[]>;
  findUnique(criteria: TFindUniqueArgs): Promise<TModel | null>;
  create(data: TCreateArgs): Promise<TModel>;
  update(data: TUpdateArgs): Promise<TModel>;
  delete(criteria: TDeleteArgs): Promise<TModel>;
}
