import { Foo } from "#Domain/Entity/Entities.js";

export interface IFooRepository {
  findById(id: number): Promise<Foo | null>;
  findOne(criteria: any): Promise<Foo | null>;
  findMany(criteria: any): Promise<Foo[]>;
  create(foo: Foo): Promise<Foo>;
  update(id: string, foo: Foo): Promise<Foo | null>;
  delete(id: string): Promise<void>;
  count(criteria: any): Promise<number>;
  exists(criteria: any): Promise<boolean>;
}
