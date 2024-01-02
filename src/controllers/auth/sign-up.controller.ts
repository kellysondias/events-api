import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signUpValidationSchema } from "../../schemas/user.schema";
import { UserModel } from "../../models/user.model";
import { hash } from "bcrypt";
import { validateAndRespond } from "../../utils/validate-and-respond/validate-and-respond";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";

export const signUp = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.body,
			signUpValidationSchema,
			res,
		);

		if (validationError) return validationError;

		const { email } = req.body;

		const userExists = Boolean(
			await UserModel.findOne({ email }),
		);

		if (userExists) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send("An user with this email already exists");
		}

		const { password } = req.body;
		const saltRounds = 10;
		const hashedPassword = await hash(password, saltRounds);
		req.body.password = hashedPassword;

		await UserModel.create(req.body);

		return res.status(StatusCodes.CREATED).send("User created");
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
