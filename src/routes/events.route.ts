import { Router } from "express";
import { CreateEventController } from "../controllers/events/create-event.controller";
import { getEventsController } from "../controllers/events/get-events.controller";
import { deleteEventsController } from "../controllers/events/delete-events.controller";
import { getEventById } from "../controllers/events/get-event-by-id.controller";
import { deleteEventById } from "../controllers/events/delete-event-by-id.controller";

const eventsRouter = Router();

eventsRouter
	.route("/events")
	.post(CreateEventController.create)
	.get(getEventsController.get)
	.delete(deleteEventsController.delete);

eventsRouter
	.route("/events/:id")
	.get(getEventById)
	.delete(deleteEventById);

export { eventsRouter };
