import { model } from "mongoose";
import { IEvent } from "../interfaces/event.interface";
import { eventSchema } from "../schemas/event.schema";

export const EventModel = model<IEvent>("Event", eventSchema);
