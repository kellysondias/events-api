import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";
import { EventSchema } from "../../schemas/event.schema";
import { validate } from "../../utils/validate";
import { EventModel } from "../../models/event.model";
import { errorMessage } from "../../utils/error-message";

export class getEventsController {
	static async get(req: Request, res: Response) {
		try {
			const validationError = validate(
				req.query,
				EventSchema.dayOfWeek.optional,
				res,
			);

			validationError && validationError;

			const { dayOfWeek } = req.query;

			let events = await EventModel.find({});

			if (dayOfWeek)
				events = await EventModel.find({ dayOfWeek });

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
	}
}
