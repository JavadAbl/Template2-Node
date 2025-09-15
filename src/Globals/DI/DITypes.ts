export const DITypes = {
  //Database
  PrismaClient: Symbol.for("PrismaClient"),

  //Controllers
  FooController: Symbol.for("FooController"),

  //Services
  FooService: Symbol.for("FooService"),

  //Routes
  AppRoutes: Symbol.for("AppRoutes"),
  FooRoutes: Symbol.for("FooRoutes"),
};

Object.freeze(DITypes);
