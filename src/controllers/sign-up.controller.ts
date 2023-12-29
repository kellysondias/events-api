import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signUpValidationSchema } from "../schemas/user.schema";
import { UserModel } from "../models/user.model";
import { hash } from "bcrypt";
import { validateAndRespond } from "../utils/validateAndRespond/validateAndRespond.ts";
import { internalServerErrorMessage } from "../utils/internalServerErrorMessage";

export const signUp = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.body,
			signUpValidationSchema,
			res,
		);

		if (validationError) return validationError;

		const { password } = req.body;
		const saltRounds = 10;
		const hashedPassword = await hash(password, saltRounds);
		req.body.password = hashedPassword;

		await UserModel.create(req.body);

		return res.status(StatusCodes.CREATED).send("User created");
	} catch (e) {
		console.log(e);
		internalServerErrorMessage(res);
	}
};
