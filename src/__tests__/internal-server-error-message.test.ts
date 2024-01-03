import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { internalServerErrorMessage } from "../utils/internal-server-error-message";
import { errorMessage } from "../utils/error-message";

describe("internalServerErrorMessage()", () => {
	let mockResponse: Partial<Response>;
	const error = "error";

	beforeEach(() => {
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		jest.spyOn(console, "log").mockImplementation(() => {});
	});

	afterEach(() => jest.restoreAllMocks());

	it("Should handle and log an internal server error", () => {
		internalServerErrorMessage(error, mockResponse as Response);

		expect(mockResponse.status).toHaveBeenCalledWith(
			StatusCodes.INTERNAL_SERVER_ERROR,
		);
		expect(mockResponse.json).toHaveBeenCalledWith(
			errorMessage(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Internal Server Error",
				"Something went wrong",
			),
		);

		expect(console.log).toHaveBeenCalledWith(error);
	});

	it("Should handle and log an internal server error with an error constructor", () => {
		const error = new Error("Another test error");

		internalServerErrorMessage(error, mockResponse as Response);

		expect(mockResponse.status).toHaveBeenCalledWith(
			StatusCodes.INTERNAL_SERVER_ERROR,
		);
		expect(mockResponse.json).toHaveBeenCalledWith(
			errorMessage(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Internal Server Error",
				"Something went wrong",
			),
		);

		expect(console.log).toHaveBeenCalledWith(error);
	});
});
