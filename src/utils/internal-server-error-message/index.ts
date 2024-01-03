import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorMessage } from "../error-message";

export const internalServerErrorMessage = (
	error: unknown,
	res: Response,
) => {
	console.log(error);

	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json(
			errorMessage(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Internal Server Error",
				"Something went wrong",
			),
		);
};
