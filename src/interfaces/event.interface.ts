import { Document } from "mongoose";

export interface IEvent extends Document {
    description: string;
    dayOfWeek: string;
    userId: string;
  }