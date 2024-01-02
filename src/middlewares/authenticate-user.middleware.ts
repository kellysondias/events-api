import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { unauthorizedRes } from "../controllers/events/unauthorized-res";
import { verify } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { internalServerErrorMessage } from "../utils/internal-server-error-message/internal-server-error-message";

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.bearer as string;

		if (!token) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json(unauthorizedRes);
		}

		const decodedToken = verify(
			token,
			process.env.JWT_SECRET as string,
		);

		const user = await UserModel.findOne({
			_id: Object(decodedToken).userId,
		});

		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json(unauthorizedRes);
		}

		req.user = user;

		next();
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
