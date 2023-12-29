import { Router } from "express";
import { signUp } from "../controllers/sign-up.controller";
import { signIn } from "../controllers/sign-in.controller";

const userRouter = Router();

userRouter.route("/sign-up").post(signUp);
userRouter.route("/sign-in").post(signIn);

export { userRouter };
