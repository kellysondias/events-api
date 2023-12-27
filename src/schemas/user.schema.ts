import Joi from "joi";
import { Schema } from "mongoose";

const signInValidationSchema = Joi.object({
	firstName: Joi.string().required().messages({
		"any.required": "First name is required.",
		"string.empty": "First name cannot be empty.",
	}),
	lastName: Joi.string().required().messages({
		"any.required": "Last name is required.",
		"string.empty": "Last name cannot be empty.",
	}),
	birthDate: Joi.date().iso().required().messages({
		"any.required": "Birth date is required.",
		"date.format": "Invalid date format.",
	}),
	city: Joi.string().required().messages({
		"any.required": "City is required.",
		"string.empty": "City cannot be empty.",
	}),
	country: Joi.string().required().messages({
		"any.required": "Country is required.",
		"string.empty": "Country cannot be empty.",
	}),
	email: Joi.string().email().required().messages({
		"any.required": "Email is required.",
		"string.empty": "Email cannot be empty.",
		"string.email": "Invalid email address.",
	}),
	password: Joi.string().required().messages({
		"any.required": "Password is required.",
		"string.empty": "Password cannot be empty.",
	}),
	confirmPassword: Joi.string()
		.valid(Joi.ref("password"))
		.required()
		.messages({
			"any.required": "Confirm password is required.",
			"any.only": "Passwords do not match.",
		}),
});

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		maxlength: 255,
	},
	lastName: {
		type: String,
		required: true,
		maxlength: 255,
	},
	birthDate: { type: Date, required: true },
	city: {
		type: String,
		required: true,
		maxlength: 255,
	},
	country: {
		type: String,
		required: true,
		maxlength: 255,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 255,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 255,
	},
});

export { signInValidationSchema, userSchema };
