import { Router } from "express";
import { signUp } from "../controllers/auth/sign-up.controller";
import { signIn } from "../controllers/auth/sign-in.controller";

const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);

export { userRouter };
