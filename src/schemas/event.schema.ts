import Joi from "joi";
import { Schema } from "mongoose";
import { MainSchema } from "./main-schema.class";

class EventSchema extends MainSchema {
	static dayOfWeek = {
		optional: Joi.object({
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
		}),

		required: Joi.object({
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
		}),
	};

	static payload = Joi.object({
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

	static id = Joi.string().length(24).hex();

	static event = new Schema({
		description: {
			type: String,
			required: true,
			maxLength: this.maxLength,
		},
		dayOfWeek: {
			type: String,
			required: true,
			maxLength: this.maxLength,
		},
		userId: {
			type: String,
			required: true,
			maxLength: this.maxLength,
		},
	});
}

export { EventSchema };
