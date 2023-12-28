import { StatusCodes } from "http-status-codes";
import { ValidationError } from "joi";
import { Response } from "express";

type ValidationResult = {
	error: ValidationError;
	warning?: ValidationError | undefined;
	value: unknown;
};

export const showValidationError = (
	validationResult: ValidationResult,
	res: Response,
) => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		type: "Validation error",
		errors: validationResult.error.details.map((error) => {
			return {
				resource: error.path.join("."),
				message: error.message,
			};
		}),
	});
};
