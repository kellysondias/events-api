import { validate } from "../utils/validate";
import { Response } from "express";
import { signUpValidationSchema } from "../schemas/user.schema";
import { StatusCodes } from "http-status-codes";

describe("validate()", () => {
	let mockResponse: Partial<Response>;

	beforeEach(() => {
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
	});

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

	const invalidPayload = {
		lastName: "string",
		birthDate: "2023-12-28",
		city: "string",
		country: "string",
		email: "john@doe.com",
		password: "Password1",
		confirmPassword: "Password1",
	};

	const schema = signUpValidationSchema;

	it("Should not return errors for valid payload", () => {
		const result = validate(
			payload,
			schema,
			mockResponse as Response,
		);

		expect(result).toBeNull();
		expect(mockResponse.status).not.toHaveBeenCalled();
		expect(mockResponse.json).not.toHaveBeenCalled();
	});

	it("Should return errors for invalid payload", () => {
		const result = validate(
			invalidPayload,
			schema,
			mockResponse as Response,
		);

		expect(result).not.toBeNull();
		expect(mockResponse.status).toHaveBeenCalledWith(
			StatusCodes.BAD_REQUEST,
		);
		expect(mockResponse.json).toHaveBeenCalledWith({
			type: "Validation error",
			errors: {
				resource: "'firstName'",
				message: "First name is required. ",
			},
		});
	});
});
