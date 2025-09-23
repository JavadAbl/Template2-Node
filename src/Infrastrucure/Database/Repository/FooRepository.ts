import { inject, injectable } from "inversify";
import { IFooRepository } from "../Interfaces/IFooRepository.js";
import { Foo, PrismaClient, Prisma } from "../Prisma/index.js";
import { DITypes } from "#Globals/DI/DITypes.js";

@injectable()
export class FooRepository implements IFooRepository {
  private readonly prisma;
  constructor(@inject(DITypes.PrismaClient) prisma: PrismaClient) {
    this.prisma = prisma.foo;
  }

  findMany(criteria: Prisma.UserFindManyArgs): Promise<Foo[]> {
    return this.prisma.findMany(criteria);
  }

  findById(id: number): Promise<Foo | null> {
    throw new Error("Method not implemented.");
  }
  findOne(criteria: any): Promise<Foo | null> {
    throw new Error("Method not implemented.");
  }

  create(foo: Foo): Promise<Foo> {
    throw new Error("Method not implemented.");
  }
  update(id: string, foo: Foo): Promise<Foo | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  count(criteria: any): Promise<number> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
