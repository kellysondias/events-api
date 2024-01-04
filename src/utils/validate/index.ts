import Joi, { ObjectSchema } from "joi";
import { showSchemaValidationError } from "./show-schema-validation-error";
import { Request, Response } from "express";

export const validate = (
	payload: Request | object,
	schema: Joi.StringSchema<string> | ObjectSchema<unknown>,
	res: Response,
) => {
	const validationResult = schema.validate(payload, {
		abortEarly: false,
	});

	if (validationResult.error)
		return showSchemaValidationError(validationResult, res);

	return null;
};
