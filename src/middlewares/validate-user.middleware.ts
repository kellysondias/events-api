import { IUser } from "../interfaces/user.interface";
import { errorMessage } from "../utils/error-message";
import { compare } from "bcrypt";
import { UserModel } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../utils/internal-server-error-message";
import { NextFunction, Request, Response } from "express";

export async function validateUserMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				type: "Validation Error",
				errors: [
					{
						resource: "email",
						message: "invalid email or password",
					},
				],
			});
		}

		if (!user.email) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				type: "Validation Error",
				errors: [
					{
						resource: "email",
						message: "invalid email",
					},
				],
			});
		}

		const passwordMatch = await compare(
			password,
			(user as IUser).password,
		);

		if (!passwordMatch) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json(
					errorMessage(
						401,
						"Unauthorized",
						"invalid password",
					),
				);
		}

		req.user = user;

		next();
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
}
