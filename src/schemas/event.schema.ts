import Joi from "joi";
import { Schema } from "mongoose";

const maxLength = 255;

const dayOfWeekReqParamsSchema = Joi.object({
	dayOfWeek: Joi.string()
		.valid(
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		)
		.insensitive(),
});

const dayOfWeekRequiredReqParamsSchema = Joi.object({
	dayOfWeek: Joi.string()
		.valid(
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		)
		.insensitive()
		.required()
});

const eventPayloadValidationSchema = dayOfWeekReqParamsSchema.keys({
	description: Joi.string().required(),
});

const idSchema = Joi.string().length(24).hex();

const eventSchema = new Schema({
	description: {
		type: String,
		required: true,
		maxLength,
	},
	dayOfWeek: {
		type: String,
		required: true,
		maxLength,
	},
	userId: {
		type: String,
		required: true,
		maxLength,
	},
});

export {
	dayOfWeekReqParamsSchema,
	eventPayloadValidationSchema,
	dayOfWeekRequiredReqParamsSchema,
	eventSchema,
	idSchema
};
