import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../../utils/internalServerErrorMessage";

export const createEvent = (req: Request, res: Response) => {
	try {
		res.status(StatusCodes.CREATED).json();
	} catch (error) {
		internalServerErrorMessage(error, res);
	}
};
