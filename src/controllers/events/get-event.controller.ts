import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internalServerErrorMessage";
import { dayOfWeekReqParamsSchema } from "../../schemas/event.schema";
import { validateAndRespond } from "../../utils/validateAndRespond/validateAndRespond";
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
