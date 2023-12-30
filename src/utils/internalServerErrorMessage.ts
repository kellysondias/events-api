import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const internalServerErrorMessage = (error: unknown, res: Response, ) => {
	console.log(error);

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		statusCode: 500,
		error: "Internal Server Error",
		message: "Something went wrong",
	});
}
	
