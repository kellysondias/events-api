import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signInValidationSchema } from "../schemas/user.schema";
import Joi from "joi";
import { showValidationError } from "../utils/showValidationError";

const validateAndRespond = (
	data: Request,
	schema: Joi.ObjectSchema,
	res: Response,
) => {
	const validationResult = schema.validate(data, {
		abortEarly: false,
	});

	console.log(validationResult.error!.details);

	if (validationResult.error)
		showValidationError(validationResult, res);

	return null;
};

export const signUp = async (req: Request, res: Response) => {
	const validationError = validateAndRespond(
		req.body,
		signInValidationSchema,
		res,
	);

	if (validationError) {
		return validationError;
	}

	const payload = req.body;

	return res.status(StatusCodes.CREATED).json(payload);
};
