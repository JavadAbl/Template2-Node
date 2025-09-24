import { registerUserSchema } from "#API/Validators/User/RegisterUserSchema.js";
import z from "zod";

export type IRegisterUser = z.infer<typeof registerUserSchema>;
