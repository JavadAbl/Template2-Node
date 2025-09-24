export const DITypes = {
  //Database
  PrismaClient: Symbol.for("PrismaClient"),
  UserRepository: Symbol.for("UserRepository"),
  FooRepository: Symbol.for("FooRepository"),

  //Controllers
  UserController: Symbol.for("UserController"),
  FooController: Symbol.for("FooController"),

  //Services
  UserService: Symbol.for("UserService"),
  FooService: Symbol.for("FooService"),

  //Routes
  AppRoutes: Symbol.for("AppRoutes"),
  UserRoutes: Symbol.for("UserRoutes"),
  FooRoutes: Symbol.for("FooRoutes"),
};

Object.freeze(DITypes);
