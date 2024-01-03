import Joi from "joi";
import { Schema } from "mongoose";

const maxLengthMessage = "Cannot exceed 255 characters.";
const maxLength = [255, maxLengthMessage];

const signInValidationSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.empty": "Email cannot be empty.",
		"string.email": "Invalid email.",
	}),
	password: Joi.string().required().messages({
		"string.empty": "Password cannot be empty.",
	}),
});

const signUpValidationSchema = Joi.object({
	firstName: Joi.string().max(255).required().messages({
		"any.required": "First name is required.",
		"string.empty": "First name cannot be empty.",
		"string.max": maxLengthMessage,
	}),
	lastName: Joi.string().max(255).required().messages({
		"any.required": "Last name is required.",
		"string.empty": "Last name cannot be empty.",
		"string.max": maxLengthMessage,
	}),
	birthDate: Joi.date().iso().required().messages({
		"any.required": "Birth date is required.",
		"date.format": "Invalid date format.",
	}),
	city: Joi.string().max(255).required().messages({
		"any.required": "City is required.",
		"string.empty": "City cannot be empty.",
		"string.max": maxLengthMessage,
	}),
	country: Joi.string().max(255).required().messages({
		"any.required": "Country is required.",
		"string.empty": "Country cannot be empty.",
		"string.max": maxLengthMessage,
	}),
	email: Joi.string().email().max(255).required().messages({
		"any.required": "Email is required.",
		"string.empty": "Email cannot be empty.",
		"string.email": "Invalid email.",
		"string.max": maxLengthMessage,
	}),
	password: Joi.string()
		.regex(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
		.max(255)
		.required()
		.messages({
			"string.pattern.base":
				"Password must contain at least one uppercase letter, six characters and one number.",
			"any.required": "Password is required.",
			"string.max": maxLengthMessage,
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
		maxLength,
	},
	lastName: {
		type: String,
		required: true,
		maxLength,
	},
	birthDate: { type: Date, required: true },
	city: {
		type: String,
		required: true,
		maxLength,
	},
	country: {
		type: String,
		required: true,
		maxLength,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxLength,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxLength,
	},
});

export { signUpValidationSchema, signInValidationSchema, userSchema };
