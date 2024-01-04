import { IUser } from "../interfaces/user.interface";

export {};

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}
