import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EventModel } from "../../models/event.model";
import { errorMessage } from "../../utils/error-message";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message";
import { EventSchema } from "../../schemas/event.schema";

export class deleteEventByIdController {
	static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const { error } = EventSchema.id.validate(id);

			if (error) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json(
						errorMessage(
							StatusCodes.BAD_REQUEST,
							"Invalid id",
							"Invalid id",
						),
					);
			}

			const deletedEvent = await EventModel.findById(id);

			await EventModel.findByIdAndDelete(id);

			if (!deletedEvent)
				return res
					.status(StatusCodes.NOT_FOUND)
					.json(
						errorMessage(
							StatusCodes.NOT_FOUND,
							"Not Found",
							"Not Found",
						),
					);

			res.status(StatusCodes.NO_CONTENT).json("Event deleted");
		} catch (error) {
			internalServerErrorMessage(error, res);
		}
	}
}
