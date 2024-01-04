import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";
import { EventModel } from "../../models/event.model";
import { validate } from "../../utils/validate";
import { EventSchema } from "../../schemas/event.schema";

export const createEvent = async (req: Request, res: Response) => {
	try {
		const validationError = validate(
			req.body,
			EventSchema.payload,
			res,
		);

		if (validationError) return validationError;

		const payload = req.body;

		const newEvent = {
			...payload,
			userId: req.user!.id,
		};

		const event = await EventModel.create(newEvent);

		res.status(StatusCodes.CREATED).json(event);
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
