import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateAndRespond } from "../utils/validateAndRespond/validateAndRespond";
import { signInValidationSchema } from "../schemas/user.schema";
import { UserModel } from "../models/user.model";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { internalServerErrorMessage } from "../utils/internalServerErrorMessage";
import IUser from "../interfaces/user.interface";

export const signIn = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.body,
			signInValidationSchema,
			res,
		);

		if (validationError) return validationError;

		const { email, password } = req.body;
		const user = await UserModel.findOne({ email, password });
		const passwordMatch = await compare(
			password,
			(user as IUser).password,
		);

		if (!user || !passwordMatch) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				statusCode: 401,
				error: "Unauthorized",
				message: "Invalid email or password",
			});
		}

		const token = sign(
			{ userId: user._id },
			`${process.env.JWT_SECRET}`,
			{ expiresIn: "30d" },
		);

		res.status(StatusCodes.CREATED).json({ token });
	} catch (e) {
		console.log(e);
		internalServerErrorMessage(res);
	}
};
