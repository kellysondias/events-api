import { Router } from "express";
import { SignUpController } from "../controllers/auth/sign-up.controller";
import { SignInController } from "../controllers/auth/sign-in-controller";
import { validateUserMiddleware } from "../middlewares/validate-user.middleware";
const userRouter = Router();

userRouter.post("/sign-up", SignUpController.signUp);
userRouter.post(
	"/sign-in",
	validateUserMiddleware,
	SignInController.signIn,
);

export { userRouter };
