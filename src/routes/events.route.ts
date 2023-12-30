import { Router } from "express";

const eventsRouter = Router();

eventsRouter
	.route("/events")
	.post((_, res) => res.send("POST events route"))
	.get((_, res) => res.send("GET events route"))
	.delete((_, res) => res.send("DELETE events route"));

eventsRouter
	.route("/events/:id")
	.get((_, res) => res.send("GET events/:id route"))
	.delete((_, res) => res.send("DELETE events/:id route"));

export { eventsRouter };
