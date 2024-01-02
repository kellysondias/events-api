import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internal-server-error-message/internal-server-error-message";

export const deleteEvent = async (req: Request, res: Response) => {
	try {
		res.status(StatusCodes.OK).json("working");
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
