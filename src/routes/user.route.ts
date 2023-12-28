import { Router } from "express";
import { signUp } from "../controllers/sign-up.controller";

const userRouter = Router();

userRouter.route("/sign-up").post(signUp);

userRouter.route("/sign-in").post();

export { userRouter };
