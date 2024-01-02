import { Router } from "express";
import { createEvent } from "../controllers/events/create-event.controller";
import { getEvents } from "../controllers/events/get-events.controller";
import { deleteEvents } from "../controllers/events/delete-events.controller";
import { getEventById } from "../controllers/events/get-event-by-id.controller";

const eventsRouter = Router();

eventsRouter
	.route("/events")
	.post(createEvent)
	.get(getEvents)
	.delete(deleteEvents);

eventsRouter
	.route("/events/:id")
	.get(getEventById)
	.delete((_, res) => res.send("DELETE events/:id route"));

export { eventsRouter };
