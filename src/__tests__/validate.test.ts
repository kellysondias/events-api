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

	const schema = signUpValidationSchema;

	it("Should not return error for valid payload", () => {
		const result = validate(
			payload,
			schema,
			mockResponse as Response,
		);

		expect(result).toBeNull();
		expect(mockResponse.status).not.toHaveBeenCalled();
		expect(mockResponse.json).not.toHaveBeenCalled();
	});

	it("Should return errors for missing required fields", () => {
		const fieldMissingPayload = {
			birthDate: "2023-12-28",
			city: "string",
			country: "string",
			email: "john@doe.com",
			password: "Password1",
			confirmPassword: "Password1",
		};

		const result = validate(
			fieldMissingPayload,
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
				resource: "'firstName', 'lastName'",
				message:
					"First name is required. Last name is required. ",
			},
		});
	});

	it("Should return error for invalid string length", () => {
		const invalidLength = 256;

		const payloadWithInvalidLength = {
			...payload,
			firstName: "John".repeat(invalidLength),
		};

		const result = validate(
			payloadWithInvalidLength,
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
				message: "Cannot exceed 255 characters. ",
			},
		});
	});

	it("Should return error for invalid email format", () => {
		const payloadWithInvalidEmail = {
			...payload,
			email: "invalidemail.com",
		};

		const result = validate(
			payloadWithInvalidEmail,
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
				resource: "'email'",
				message: "Invalid email. ",
			},
		});
	});

	it("Should return error for invalid password", () => {
		const payloadWithWeakPassword = {
			...payload,
			password: "weak",
			confirmPassword: "weak",
		};

		const result = validate(
			payloadWithWeakPassword,
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
				resource: "'password'",
				message:
					"Password must contain at least one uppercase letter, six characters and one number. ",
			},
		});
	});

	it("Should return error for non-matching passwords", () => {
		const payloadWithWeakPassword = {
			...payload,
			password: "Password1",
			confirmPassword: "Password2",
		};

		const result = validate(
			payloadWithWeakPassword,
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
				resource: "'confirmPassword'",
				message: "Passwords do not match. ",
			},
		});
	});
});
