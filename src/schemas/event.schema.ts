import Joi from "joi";
import { Schema } from "mongoose";

const maxLength = 255;

const eventPayloadValidationSchema = Joi.object({
	description: Joi.string().required(),
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
		.required(),
});

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

export { eventPayloadValidationSchema, eventSchema };
