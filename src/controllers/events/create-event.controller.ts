import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internalServerErrorMessage";
import { unauthorizedRes } from "./unauthorized-res";
import { verify } from "jsonwebtoken";
import { UserModel } from "../../models/user.model";

export const createEvent = async (req: Request, res: Response) => {
	try {
		const token = req.headers.bearer!;

		const decodedToken = verify(
			token as string,
			process.env.JWT_SECRET as string,
		);

		const user = await UserModel.findOne({
			_id: Object(decodedToken).userId,
		});

		if (!token || !user)
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json(unauthorizedRes);

		const event = req.body;

		const createdEvent = {
			...event,
			userId: user.id,
		};

		res.status(StatusCodes.CREATED).json(createdEvent);
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
