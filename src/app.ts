import express from "express";
import "express-async-errors";
import "dotenv/config";
import { userRouter } from "./routes/user.route";
import { eventsRouter } from "./routes/events.route";
import { authenticateUser } from "./middlewares/authenticate-user.middleware";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use(authenticateUser);
app.use("/api/v1", eventsRouter);

export { app };
