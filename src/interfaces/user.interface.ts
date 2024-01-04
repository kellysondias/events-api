import { Document } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	birthDate: Date;
	city: string;
	country: string;
	email: string;
	password: string;
}
