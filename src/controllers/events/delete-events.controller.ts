import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message/internal-server-error-message";
import { dayOfWeekRequiredReqParamsSchema } from "../../schemas/event.schema";
import { validateAndRespond } from "../../utils/validate-and-respond/validate-and-respond";
import { EventModel } from "../../models/event.model";
import { errorMessage } from "../../utils/error-message";

export const deleteEvents = async (req: Request, res: Response) => {
	try {
		const validationError = validateAndRespond(
			req.query,
			dayOfWeekRequiredReqParamsSchema,
			res,
		);

		validationError && validationError;

		const { dayOfWeek } = req.query;

		const deletedEvents = await EventModel.find({
			dayOfWeek,
		}).lean();

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
};