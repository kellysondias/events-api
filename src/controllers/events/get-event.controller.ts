import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message/internal-server-error-message";
import { dayOfWeekReqParamsSchema } from "../../schemas/event.schema";
import { validateAndRespond } from "../../utils/validate-and-respond/validate-and-respond";
import { EventModel } from "../../models/event.model";
import { errorMessage } from "../../utils/error-message";

/*

			COLOCAR 404 SEU NOIAAAAAAAAAA

*/

export const getEvents = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.query,
			dayOfWeekReqParamsSchema,
			res,
		);

		validationError && validationError;

		const { dayOfWeek } = req.query;

		let events = await EventModel.find({});

		if (dayOfWeek) events = await EventModel.find({ dayOfWeek });

		if (events.length === 0)
			return res
				.status(StatusCodes.NOT_FOUND)
				.json(
					errorMessage(
						StatusCodes.NOT_FOUND,
						"Not Found",
						"Not Found",
					),
				);

		res.status(StatusCodes.OK).json(events);
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
