import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";
import { unauthorizedRes } from "./unauthorized-res";
import { verify } from "jsonwebtoken";
import { UserModel } from "../../models/user.model";
import { eventPayloadValidationSchema } from "../../schemas/event.schema";
import { EventModel } from "../../models/event.model";
import { validateAndRespond } from "../../utils/validate-and-respond/validate-and-respond";

export const createEvent = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.body,
			eventPayloadValidationSchema,
			res,
		);

		if (validationError) return validationError;

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

		const payload = req.body;

		const newEvent = {
			...payload,
			userId: user.id,
		};

		const event = await EventModel.create(newEvent);

		res.status(StatusCodes.CREATED).json(event);
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
