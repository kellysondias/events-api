import Joi from "joi";
import { Schema } from "mongoose";

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
	},
	dayOfWeek: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
});

export { eventPayloadValidationSchema, eventSchema };
