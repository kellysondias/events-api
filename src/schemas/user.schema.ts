import Joi from "joi";
import { Schema } from "mongoose";
import { MainSchema } from "./main-schema.class";

export class UserSchema extends MainSchema {
	static signIn = Joi.object({
		email: Joi.string().email().required().messages({
			"string.empty": "Email cannot be empty.",
			"string.email": "Invalid email.",
		}),
		password: Joi.string().required().messages({
			"string.empty": "Password cannot be empty.",
		}),
	});

	static signUp = Joi.object({
		firstName: Joi.string().max(255).required().messages({
			"any.required": "First name is required.",
			"string.empty": "First name cannot be empty.",
			"string.max": this.maxLengthMessage,
		}),
		lastName: Joi.string().max(255).required().messages({
			"any.required": "Last name is required.",
			"string.empty": "Last name cannot be empty.",
			"string.max": this.maxLengthMessage,
		}),
		birthDate: Joi.date().iso().required().messages({
			"any.required": "Birth date is required.",
			"date.format": "Invalid date format.",
		}),
		city: Joi.string().max(255).required().messages({
			"any.required": "City is required.",
			"string.empty": "City cannot be empty.",
			"string.max": this.maxLengthMessage,
		}),
		country: Joi.string().max(255).required().messages({
			"any.required": "Country is required.",
			"string.empty": "Country cannot be empty.",
			"string.max": this.maxLengthMessage,
		}),
		email: Joi.string().email().max(255).required().messages({
			"any.required": "Email is required.",
			"string.empty": "Email cannot be empty.",
			"string.email": "Invalid email.",
			"string.max": this.maxLengthMessage,
		}),
		password: Joi.string()
			.regex(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
			.max(255)
			.required()
			.messages({
				"string.pattern.base":
					"Password must contain at least one uppercase letter, six characters and one number.",
				"any.required": "Password is required.",
				"string.max": this.maxLengthMessage,
			}),
		confirmPassword: Joi.string()
			.valid(Joi.ref("password"))
			.required()
			.messages({
				"any.required": "Confirm password is required.",
				"any.only": "Passwords do not match.",
			}),
	});

	static user = new Schema({
		firstName: {
			type: String,
			required: true,
			maxLength: this.maxLength,
		},
		lastName: {
			type: String,
			required: true,
			maxLength: this.maxLength,
		},
		birthDate: { type: Date, required: true },
		city: {
			type: String,
			required: true,
			maxLength: this.maxLength,
		},
		country: {
			type: String,
			required: true,
			maxLength: this.maxLength,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			maxLength: this.maxLength,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxLength: this.maxLength,
		},
	});
}
