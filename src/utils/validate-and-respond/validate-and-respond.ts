import Joi from "joi";
import { showValidationError } from "./show-validation-error";
import { Response } from "express";

export const validateAndRespond = (
	payload: Request | object,
	schema: Joi.ObjectSchema,
	res: Response,
) => {
	const validationResult = schema.validate(payload, {
		abortEarly: false,
	});

	if (validationResult.error)
		return showValidationError(validationResult, res);

	return null;
};