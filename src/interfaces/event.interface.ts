import { Document } from "mongoose";

export enum DayOfWeek {
	Sunday = "sunday",
	Monday = "monday",
	Tuesday = "tuesday",
	Wednesday = "wednesday",
	Thursday = "thursday",
	Friday = "friday",
	Saturday = "saturday",
}

export interface IEvent extends Document {
	description: string;
	dayOfWeek: DayOfWeek;
	userId: string;
}
