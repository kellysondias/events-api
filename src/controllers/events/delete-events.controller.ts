import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";
import { EventSchema } from "../../schemas/event.schema";
import { validate } from "../../utils/validate";
import { EventModel } from "../../models/event.model";
import { errorMessage } from "../../utils/error-message";

export class deleteEventsController {
	static async delete(req: Request, res: Response) {
		try {
			const validationError = validate(
				req.query,
				EventSchema.dayOfWeek.required,
				res,
			);

			validationError && validationError;

			const { dayOfWeek } = req.query;

			const deletedEvents = await EventModel.find({
				dayOfWeek,
			});

			await EventModel.deleteMany({ dayOfWeek });

			if (deletedEvents.length === 0)
				return res
					.status(StatusCodes.NOT_FOUND)
					.json(
						errorMessage(
							StatusCodes.NOT_FOUND,
							"Not Found",
							"Not Found",
						),
					);

			res.status(StatusCodes.OK).json({ deletedEvents });
		} catch (error) {
			internalServerErrorMessage(error, res);
		}
	}
}
