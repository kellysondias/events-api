import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validate } from "../../../utils/validate";
import { UserSchema } from "../../../schemas/user.schema";
import { sign } from "jsonwebtoken";
import { internalServerErrorMessage } from "../../../utils/internal-server-error-message";

export class SignInController {
	static async signIn(req: Request, res: Response) {
		try {
			const validationError = validate(
				req.body,
				UserSchema.signIn,
				res,
			);

			if (validationError) return validationError;

			const user = req.user!;

			const token = sign(
				{ userId: user._id },
				`${process.env.JWT_SECRET}`,
				{ expiresIn: "30d" },
			);

			res.status(StatusCodes.CREATED).json({ token });
		} catch (error) {
			internalServerErrorMessage(error, res);
		}
	}
}
