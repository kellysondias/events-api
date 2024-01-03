import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorMessage } from "../../utils/error-message";
import { EventModel } from "../../models/event.model";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";

export const getEventById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const event = await EventModel.findById(id);

		if (!event)
			return res
				.status(StatusCodes.NOT_FOUND)
				.json(
					errorMessage(
						StatusCodes.NOT_FOUND,
						"Not Found",
						"Not Found",
					),
				);

		res.status(StatusCodes.OK).json(event);
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
