import Joi from "joi";
import { showValidationError } from ".";
import { Response } from "express";

export const validateAndRespond = (
	payload: Request,
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