import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signInValidationSchema } from "../schemas/user.schema";
import Joi from "joi";

const validateAndRespond = (
	data: Request,
	schema: Joi.ObjectSchema,
	res: Response,
) => {
	const validationResult = schema.validate(data);

	if (validationResult.error) {
		const validationErrors = validationResult.error.details.map(
			(err) => err.message,
		);
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: validationErrors });
	}

	return;
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