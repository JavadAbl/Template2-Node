// BaseRepository.ts
export class BaseRepository<TModel, TFindManyArgs, TFindUniqueArgs, TCreateArgs, TUpdateArgs, TDeleteArgs> {
  constructor(
    private readonly delegate: {
      findMany(args?: TFindManyArgs): Promise<TModel[]>;
      findUnique(args: TFindUniqueArgs): Promise<TModel | null>;
      create(args: TCreateArgs): Promise<TModel>;
      update(args: TUpdateArgs): Promise<TModel>;
      delete(args: TDeleteArgs): Promise<TModel>;
    },
  ) {}

  findMany(criteria?: TFindManyArgs): Promise<TModel[]> {
    return this.delegate.findMany(criteria);
  }

  findUnique(criteria: TFindUniqueArgs): Promise<TModel | null> {
    return this.delegate.findUnique(criteria);
  }

  create(data: TCreateArgs): Promise<TModel> {
    return this.delegate.create(data);
  }

  update(data: TUpdateArgs): Promise<TModel> {
    return this.delegate.update(data);
  }

  delete(criteria: TDeleteArgs): Promise<TModel> {
    return this.delegate.delete(criteria);
  }
}
