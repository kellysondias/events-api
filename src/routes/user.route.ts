import { Router } from "express";
import { signUp } from "../controllers/sign-up.controller";

const userRouter = Router();

userRouter.route("/sign-up").post(signUp);

export { userRouter };
