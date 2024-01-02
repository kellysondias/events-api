import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message/internal-server-error-message";
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
