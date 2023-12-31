import { Router } from "express";
import { createEvent } from "../controllers/events/create-event.controller";

const eventsRouter = Router();

eventsRouter
	.route("/events")
	.post(createEvent)
	.get((_, res) => res.send("GET events route"))
	.delete((_, res) => res.send("DELETE events route"));

eventsRouter
	.route("/events/:id")
	.get((_, res) => res.send("GET events/:id route"))
	.delete((_, res) => res.send("DELETE events/:id route"));

export { eventsRouter };
