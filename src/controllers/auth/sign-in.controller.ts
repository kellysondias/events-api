import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validate } from "../../utils/validate";
import { UserSchema } from "../../schemas/user.schema";
import { UserModel } from "../../models/user.model";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";
import { IUser } from "../../interfaces/user.interface";
import { errorMessage } from "../../utils/error-message";

export const signIn = async (req: Request, res: Response) => {
	try {
		const validationError = validate(
			req.body,
			UserSchema.signIn,
			res,
		);

		if (validationError) return validationError;

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

		const token = sign(
			{ userId: user._id },
			`${process.env.JWT_SECRET}`,
			{ expiresIn: "30d" },
		);

		res.status(StatusCodes.CREATED).json({ token });
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
