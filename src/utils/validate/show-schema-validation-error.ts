import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { ValidationResult } from "../../types/validation-result";

export const showSchemaValidationError = (
	validationResult: ValidationResult,
	res: Response,
) => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		type: "Validation error",
		errors: validationResult.error.details.map((error) => {
			return {
				resource: error.path.join(),
				message: error.message,
			};
		}),
	});
};
