import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SignUpController } from "../controllers/auth/sign-up.controller";
import { UserModel } from "../models/user.model";
import { hash } from "bcrypt";
import { validate } from "../utils/validate";

jest.mock("bcrypt");
jest.mock("../utils/validate");
jest.mock("../schemas/user.schema");
jest.mock("../models/user.model");
jest.mock("express");

describe("SignUpController()", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const res: Response = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	} as never;

	it("should handle validation errors", async () => {
		const falsyReq: Request = {
			body: {
				firstName: "John",
				lastName: "Doe",
				birthDate: "2023-12-28",
				city: "country",
				country: "country",
				email: "johndoe.com",
				password: "password",
				confirmPassword: "password",
			},
		} as never;

		const falsyRes: Response = {
			status: StatusCodes.BAD_REQUEST,
			json: jest.fn(),
		} as never;

		const validationError = {
			type: "Validation error",
			errors: [
				{ resource: "resource", message: "invalid resource" },
			],
		};

		(validate as jest.Mock).mockResolvedValueOnce(
			validationError,
		);

		await SignUpController.signUp(falsyReq, falsyRes);

		expect(hash).not.toHaveBeenCalled();
		expect(UserModel.create).not.toHaveBeenCalled();
		expect(falsyRes.status).toBe(StatusCodes.BAD_REQUEST);
		expect(res.json).not.toHaveBeenCalled();
	});
});
