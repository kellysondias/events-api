import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const showValidationError = (error: string, res: Response) => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		type: "Validation error",
		error,
	});
};
