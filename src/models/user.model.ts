import { model } from "mongoose";
import ICustomer from "../interfaces/user.interface";
import { userSchema } from "../schemas/user.schema";

export const UserModel = model<ICustomer>("User", userSchema);
