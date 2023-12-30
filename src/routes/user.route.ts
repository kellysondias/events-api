import { Router } from "express";
import { signUp } from "../controllers/sign-up.controller";
import { signIn } from "../controllers/sign-in.controller";

const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);

export { userRouter };
