import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";
import { dayOfWeekReqParamsSchema } from "../../schemas/event.schema";
import { validateAndRespond } from "../../utils/validate-and-respond/validate-and-respond";
import { EventModel } from "../../models/event.model";

export const getEvents = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.query,
			dayOfWeekReqParamsSchema,
			res,
		);

		validationError && validationError;

		const { dayOfWeek } = req.query;

		const events = await EventModel.find({ dayOfWeek });

		res.status(StatusCodes.OK).json(events);
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
