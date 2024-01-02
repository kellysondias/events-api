import { Router } from "express";
import { createEvent } from "../controllers/events/create-event.controller";
import { getEvents } from "../controllers/events/get-events.controller";
import { deleteEvent } from "../controllers/events/delete-event.controller";

const eventsRouter = Router();

eventsRouter
	.route("/events")
	.post(createEvent)
	.get(getEvents)
	.delete(deleteEvent);

eventsRouter
	.route("/events/:id")
	.get((_, res) => res.send("GET events/:id route"))
	.delete((_, res) => res.send("DELETE events/:id route"));

export { eventsRouter };
