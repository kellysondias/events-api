import { model } from "mongoose";
import {IUser} from "../interfaces/user.interface";
import { userSchema } from "../schemas/user.schema";

export const UserModel = model<IUser>("User", userSchema);
