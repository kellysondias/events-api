import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { ValidationResult } from "../../../types/validation-result";
import { Format } from "./format.class";

export const showSchemaValidationError = (
	validationResult: ValidationResult,
	res: Response,
) => {
	let resource = "";
	let message = "";

	for (const error of validationResult.error.details) {
		resource += Format.resource(resource, error.path);
		message += Format.message(error.message);
	}

	return res.status(StatusCodes.BAD_REQUEST).json({
		type: "Validation error",
		errors: {
			resource,
			message,
		},
	});
};
