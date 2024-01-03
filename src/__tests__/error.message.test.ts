import { errorMessage } from "../utils/error-message";

describe("errorMessage()", () => {
	it("Should create a validation error object", () => {
		const result = errorMessage(404, "Not Found", "Not Found");

		expect(result).toEqual({
			statusCode: 404,
			error: "Not Found",
			message: "Not Found",
		});
	});

	it("Should handle other error types", () => {
		const result = errorMessage(
			500,
			"Internal Server Error",
			"Something went wrong",
		);

		expect(result).toEqual({
			statusCode: 500,
			error: "Internal Server Error",
			message: "Something went wrong",
		});
	});

	it("Should handle missing error message", () => {
		const result = errorMessage(403, "Forbidden");

		expect(result).toEqual({
			statusCode: 403,
			error: "Forbidden",
			message: undefined,
		});
	});

	it("Should handle negative status code", () => {
		const result = errorMessage(
			-1,
			"Custom Error",
			"custom error message",
		);

		expect(result).toEqual({
			statusCode: -1,
			error: "Custom Error",
			message: "custom error message",
		});
	});
});
