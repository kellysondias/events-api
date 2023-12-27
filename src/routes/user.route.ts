import { Router } from "express";

const userRouter = Router();

userRouter.route("/sign-up").post((req, res) => res.send("OLAR"));

userRouter.route("/sign-in").post();

export { userRouter };
