import express from "express";
import "express-async-errors";
import "dotenv/config";
import { userRouter } from "./routes/user.route";
import { eventsRouter } from "./routes/events.route";

const app = express();

app.use(express.json());
app.use("/api/v1", eventsRouter);
app.use("/api/v1/users", userRouter);

export { app };
