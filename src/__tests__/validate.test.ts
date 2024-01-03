import Joi from "joi";
import { validate } from "../utils/validate";
import { Response } from "express";

//let mockResponse: Partial<Response>;

const mockResponse = {
	status: jest.fn(),
	json: jest.fn(),
};

describe("validate()", () => {
	const payload = {
		firstName: "string",
		lastName: "string",
		birthDate: "2023-12-28",
		city: "string",
		country: "string",
		email: "john@doe.com",
		password: "Password1",
		confirmPassword: "Password1",
	};

	const schema = Joi.object({
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
			"string.email": "Invalid email.",
		}),
		password: Joi.string()
			.regex(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
			.required()
			.messages({
				"string.pattern.base":
					"Password must contain at least one uppercase letter, six characters and one number.",
				"any.required": "Password is required.",
			}),
		confirmPassword: Joi.string()
			.valid(Joi.ref("password"))
			.required()
			.messages({
				"any.required": "Confirm password is required.",
				"any.only": "Passwords do not match.",
			}),
	});

	it("Should not return errors for valid payload", () => {
		const result = validate(
			payload,
			schema,
			mockResponse as unknown as Response,
		);

		expect(result).toBeNull();
		expect(mockResponse.status).not.toHaveBeenCalled();
		expect(mockResponse.json).not.toHaveBeenCalled();
	});
});
