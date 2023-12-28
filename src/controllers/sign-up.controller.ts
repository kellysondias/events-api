import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signInValidationSchema } from "../schemas/user.schema";
import { UserModel } from "../models/user.model";
import { hash } from "bcrypt";
import { validateAndRespond } from "../utils/validateAndRespond/validateAndRespond";

export const signUp = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.body,
			signInValidationSchema,
			res,
		);

		if (validationError) return validationError;

		const { password } = req.body;
		const saltRounds = 10;
		const hashedPassword = await hash(password, saltRounds);
		req.body.password = hashedPassword;

		await UserModel.create(req.body);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: "User created",
		});
	} catch (error) {
		throw new Error(String(error));
	}
};
